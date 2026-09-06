"use client";

import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import Icon from "./Icon";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  summaryLines,
  activeTotal,
  fmt,
} from "@/lib/estimateStore";

const WEBHOOK = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [firstName, setFirstName] = useState("");
  const nameRef = useRef(null);

  // Live estimate from the shared store — updates in real time as the user
  // changes options in the estimator, even while the form is in view.
  const estimateState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const estimateLines = summaryLines(estimateState);
  const estimateTotal = activeTotal(estimateState);
  const hasEstimate = estimateState.touched && estimateLines.length > 0;

  const set = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: false }));
  };

  useEffect(() => {
    function onPrefill(e) {
      const { message, budget } = e.detail || {};
      setForm(f => ({
        ...f,
        message: message !== undefined ? message : f.message,
        budget: budget !== undefined ? budget : f.budget,
      }));
      setErrors({});
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      const shell = document.getElementById("formShell");
      if (shell) {
        shell.classList.remove("form-flash");
        void shell.offsetWidth;
        shell.classList.add("form-flash");
      }
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    }
    window.addEventListener("dkm-prefill", onPrefill);
    return () => window.removeEventListener("dkm-prefill", onPrefill);
  }, []);

  async function onSubmit(ev) {
    ev.preventDefault();
    const nextErrors = {
      name: form.name.trim() === "",
      email: !EMAIL_RE.test(form.email.trim()),
      message: form.message.trim().length < 10,
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.message) return;

    setStatus("sending");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      budget: form.budget || "not sure",
      message: form.message.trim(),
      sentAt: new Date().toISOString(),
    };

    try {
      if (WEBHOOK) {
        const res = await fetch(WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Webhook returned " + res.status);
      } else {
        await new Promise(r => setTimeout(r, 650));
      }
      setFirstName(form.name.trim().split(" ")[0]);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-line-strong p-10">
        <div className="mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-btn text-btn-text">
          <Icon
            name="check"
            className="h-[22px] w-[22px] shrink-0 fill-none stroke-current stroke-[1.9]"
          />
        </div>
        <h3 className="mb-2 font-serif text-2xl font-medium">
          Thanks, {firstName} — got it.
        </h3>
        <p className="text-ink-2">
          We&rsquo;ll reply within one business day with next steps and a fixed
          quote. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <div id="formShell">
      <form onSubmit={onSubmit} noValidate className="grid gap-[18px]">
        <div className="grid gap-[18px] sm:grid-cols-2">
          <div>
            <label
              htmlFor="in-name"
              className="mb-[7px] block text-[13.5px] font-semibold"
            >
              Your name
            </label>
            <input
              id="in-name"
              ref={nameRef}
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              className={`field-input ${errors.name ? "border-accent-bright" : "border-line-strong"}`}
              value={form.name}
              onChange={e => set("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1.5 text-[13px] font-medium text-accent">
                Please tell us your name.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="in-email"
              className="mb-[7px] block text-[13.5px] font-semibold"
            >
              Email
            </label>
            <input
              id="in-email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
              className={`field-input ${errors.email ? "border-accent-bright" : "border-line-strong"}`}
              value={form.email}
              onChange={e => set("email", e.target.value)}
            />
            {errors.email && (
              <p className="mt-1.5 text-[13px] font-medium text-accent">
                That email doesn&rsquo;t look right.
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="in-budget"
            className="mb-[7px] block text-[13.5px] font-semibold"
          >
            Budget (optional)
          </label>
          <select
            id="in-budget"
            className="field-input border-line-strong"
            value={form.budget}
            onChange={e => set("budget", e.target.value)}
          >
            <option value="">Not sure yet</option>
            <option value="launch">Launch — $600–1,500</option>
            <option value="growth">Growth — $1,500–3,000</option>
            <option value="custom">Custom — $3,000+</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="in-msg"
            className="mb-[7px] block text-[13.5px] font-semibold"
          >
            About the project
          </label>
          <textarea
            id="in-msg"
            placeholder="What does your business do, and what do you need the website to achieve?"
            className={`field-input min-h-[130px] resize-y ${errors.message ? "border-accent-bright" : "border-line-strong"}`}
            value={form.message}
            onChange={e => set("message", e.target.value)}
          />
          {errors.message && (
            <p className="mt-1.5 text-[13px] font-medium text-accent">
              A sentence or two helps us quote accurately.
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-solid relative justify-center ${status === "sending" ? "pointer-events-none opacity-75" : ""} hover:bg-amber-500`}
        >
          {status === "sending" && (
            <span
              className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-current/35 border-t-current"
              aria-hidden="true"
            />
          )}
          {status === "sending"
            ? "Sending…"
            : status === "error"
              ? "Couldn't send — email us directly"
              : "Send & get a fixed quote"}
        </button>
      </form>
    </div>
  );
}
