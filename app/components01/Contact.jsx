"use client";

import { useState } from "react";
import Image from "next/image";

const availableNeeds = [
  "Rebranding & Identity",
  "Boots on the Ground Marketing",
  "Next.js Web Development",
  "Workflow Automation (n8n)",
  "Social Media Exposure",
];

const initialFormData = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleNeedToggle = (need) => {
    setSelectedNeeds((current) =>
      current.includes(need)
        ? current.filter((item) => item !== need)
        : [...current, need]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ type: "", message: "" });

    if (!formData.name || !formData.email) {
      setFormStatus({
        type: "error",
        message: "Name and Email are required fields.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          needs: selectedNeeds,
        }),
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message:
            "🔑 System unlocked! Your query data has been routed to our managing partners.",
        });

        setFormData(initialFormData);
        setSelectedNeeds([]);
      } else {
        throw new Error("Server connection error");
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Network link disrupted. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 relative border-t transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 border-slate-900"
          : "bg-slate-50 border-slate-100"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {formStatus.type === "popup" && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div
              className={`p-8 rounded-2xl border max-w-sm w-full text-center shadow-2xl transition-colors ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 text-xl">
                ✓
              </div>

              <h4
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Message Transmitted
              </h4>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                System keys configured. Our automated workflows have initialized
                your onboarding data sequences.
              </p>

              <button
                onClick={() => setFormStatus({ type: "", message: "" })}
                type="button"
                className="mt-6 w-full py-2.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`p-8 md:p-10 rounded-2xl border space-y-8 ${
            darkMode
              ? "bg-slate-900/20 border-slate-800/60 shadow-[1px_1px_100px_lightyellow]"
              : "bg-white border-slate-200"
          }`}
        >
          <div
            className={`flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4 ${
              darkMode ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <div className="text-center sm:text-left">
              <h3
                className={`text-3xl font-bold tracking-wider uppercase ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Engagement Pipeline
              </h3>

              <p className="text-md text-slate-400 mt-1 font-normal">
                Select your operational criteria to establish primary system
                parameters.
              </p>
            </div>

            <div className="relative w-24 h-12 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-md">
              <Image
                src="/dkm-logo-final-01.jpeg"
                alt="Digital Keys & Marketing Core Form Asset Logo"
                width={80}
                height={40}
                className="object-contain brightness-190"
                loading="eager"
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-bold uppercase tracking-wider mb-4 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Select Required Capabilities
            </label>

            <div className="flex flex-wrap gap-2.5 mb-15">
              {availableNeeds.map((need) => {
                const isSelected = selectedNeeds.includes(need);

                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => handleNeedToggle(need)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-amber-600 text-amber-700 font-bold bg-amber-50/50"
                        : darkMode
                          ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                          : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {need} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              id="name"
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              darkMode={darkMode}
              required
            />

            <FormInput
              id="email"
              type="email"
              label="Email Address *"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleInputChange}
              darkMode={darkMode}
              required
            />
          </div>

          <FormInput
            id="company"
            label="Company / Corporate Name"
            placeholder="Apex Logistics Ltd"
            value={formData.company}
            onChange={handleInputChange}
            darkMode={darkMode}
          />

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2"
            >
              Brand Challenges / Objectives
            </label>

            <textarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Outline your project parameters..."
              className={`w-full px-4 py-3 rounded-lg text-sm resize-none transition-all focus:outline-none focus:border-amber-500 ${
                darkMode
                  ? "bg-slate-950 border-slate-200 text-slate-200 placeholder-slate-500"
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            />
          </div>

          {formStatus.message && formStatus.type !== "popup" && (
            <div
              className={`p-4 rounded-xl border text-xs font-semibold ${
                formStatus.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest disabled:opacity-40 transition-all duration-300 cursor-pointer shadow-md ${
              darkMode
                ? "bg-slate-100 text-slate-950 hover:bg-amber-400"
                : "bg-slate-900 text-white hover:bg-amber-600"
            }`}
          >
            {loading ? "Transmitting Records..." : "Submit Credentials"}
          </button>
        </form>
      </div>
    </section>
  );
}

function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  darkMode,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:border-amber-500 ${
          darkMode
            ? "bg-slate-950 border-slate-800 text-slate-200"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}
      />
    </div>
  );
}
