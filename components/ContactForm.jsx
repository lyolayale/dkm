"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

// Set this in .env.local — see README notes below. Empty = preview mode
// (form validates and shows success locally, nothing is sent).
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
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [firstName, setFirstName] = useState("");
  const nameRef = useRef(null);

  const set = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: false }));
  };

  // Listens for estimator / tier buttons and pre-fills + scrolls here
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
        void shell.offsetWidth; // restart the pulse animation
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
        // Preview mode until you wire up n8n
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
      <div className="form-ok">
        <div className="ok-badge">
          <Icon name="check" />
        </div>
        <h3>Thanks, {firstName} — got it.</h3>
        <p>
          We&rsquo;ll reply within one business day with next steps and a fixed
          quote. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <div id="formShell">
      <form onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div className={`field${errors.name ? " invalid" : ""}`}>
            <label htmlFor="in-name">Your name</label>
            <input
              id="in-name"
              ref={nameRef}
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              value={form.name}
              onChange={e => set("name", e.target.value)}
            />
            <p className="err">Please tell us your name.</p>
          </div>

          <div className={`field${errors.email ? " invalid" : ""}`}>
            <label htmlFor="in-email">Email</label>
            <input
              id="in-email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
              value={form.email}
              onChange={e => set("email", e.target.value)}
            />
            <p className="err">That email doesn&rsquo;t look right.</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="in-budget">Budget (optional)</label>
          <select
            id="in-budget"
            value={form.budget}
            onChange={e => set("budget", e.target.value)}
          >
            <option value="">Not sure yet</option>
            <option value="launch">Launch — $600–1,500</option>
            <option value="growth">Growth — $1,500–3,000</option>
            <option value="custom">Custom — $3,000+</option>
          </select>
        </div>

        <div className={`field${errors.message ? " invalid" : ""}`}>
          <label htmlFor="in-msg">About the project</label>
          <textarea
            id="in-msg"
            placeholder="What does your business do, and what do you need the website to achieve?"
            value={form.message}
            onChange={e => set("message", e.target.value)}
          />
          <p className="err">A sentence or two helps us quote accurately.</p>
        </div>

        <button
          type="submit"
          className={`btn btn-solid btn-send${status === "sending" ? " loading" : ""}`}
        >
          <span className="spinner" aria-hidden="true" />
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
