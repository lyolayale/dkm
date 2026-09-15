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
  prefillMessage,
  budgetFor,
  estimatePayload,
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
  // Fields the user has taken over by hand — once set, the estimator and
  // prefill events stop overwriting them.
  const [manual, setManual] = useState({ budget: false, message: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [firstName, setFirstName] = useState("");
  const nameRef = useRef(null);

  // Live estimate from the shared store — updates in real time as the user
  // changes options in the estimator, even while the form is in view.
  const estimateState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const estimateLines = summaryLines(estimateState);
  const estimateTotal = activeTotal(estimateState);
  const hasEstimate = estimateState.touched && estimateLines.length > 0;

  // Dynamic fill: as soon as the estimator is touched, budget + message mirror
  // it live — unless the user has taken that field over by hand. Manual edits
  // always win; explicit prefill events (tier cards) fill the fields directly
  // and give way to the store once the estimator is used.
  const syncedBudget = estimateState.touched ? budgetFor(estimateTotal) : "";
  const syncedMessage = estimateState.touched
    ? prefillMessage(estimateState)
    : "";
  const budget = manual.budget ? form.budget : syncedBudget || form.budget;
  const message = manual.message ? form.message : syncedMessage || form.message;

  const set = (key, value, manualEdit = false) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: false }));
    if (manualEdit) setManual(m => ({ ...m, [key]: true }));
  };

  useEffect(() => {
    function onPrefill(e) {
      const { message: pMessage, budget: pBudget } = e.detail || {};
      if (pMessage !== undefined || pBudget !== undefined) {
        setForm(f => ({
          ...f,
          message: pMessage !== undefined ? pMessage : f.message,
          budget: pBudget !== undefined ? pBudget : f.budget,
        }));
      }
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
      message: message.trim().length < 10,
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.message) return;

    setStatus("sending");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      budget: budget || "not sure",
      message: message.trim(),
      sentAt: new Date().toISOString(),
      // Lets one n8n webhook route leads via a Switch node: a plain contact
      // submission vs. an estimator-guided lead.
      source: hasEstimate ? "pricing-estimator" : "contact-form",
    };
    // Structured, n8n-friendly estimate (ids + labels + totals) so downstream
    // workflows can branch on mode, budget bucket, or individual add-ons.
    if (hasEstimate) payload.estimate = estimatePayload(estimateState);

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
            value={budget}
            onChange={e => set("budget", e.target.value, true)}
          >
            <option value="">Not sure yet</option>
            <option value="launch">Launch — $600–1,500</option>
            <option value="growth">Growth — $1,500–3,000</option>
            <option value="custom">Custom — $3,000+</option>
          </select>
        </div>

        {hasEstimate && !manual.message && (
          <p className="text-[12.5px] text-ink-3">
            Estimator selections attached — this updates live as you adjust the
            estimate. Edit it and it&rsquo;s yours.
          </p>
        )}

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
            value={message}
            onChange={e => set("message", e.target.value, true)}
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
