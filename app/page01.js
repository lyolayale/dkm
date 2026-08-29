"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dkm-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    localStorage.setItem("dkm-theme", nextTheme ? "dark" : "light");
  };

  const availableNeeds = [
    "Rebranding & Identity",
    "Boots on the Ground Marketing",
    "Next.js Web Development",
    "Workflow Automation (n8n)",
    "Social Media Exposure",
  ];

  const handleNeedToggle = need => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter(item => item !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
        body: JSON.stringify({ ...formData, needs: selectedNeeds }),
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message:
            "🔑 System unlocked! Your query data has been routed to our managing partners.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
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
    <div
      id="home"
      className={`min-h-screen font-sans selection:bg-amber-400/30 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-slate-300 selection:text-amber-300"
          : "bg-white text-slate-800 selection:text-amber-900"
      }`}
    >
      <Head>
        <title>
          Digital Keys & Marketing | Premium Brand Activation & Web Development
        </title>
        <meta
          name="description"
          content="We unlock modern business growth. Premium Next.js web application designs coupled with relentless boots-on-the-ground exposure strategies."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          darkMode
            ? "bg-slate-950/80 border-slate-900"
            : "bg-white/90 border-slate-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 cursor-pointer group">
              <div
                className={`relative sm:w-50 sm:h-50 p-1 transition-all duration-300 overflow-hidden flex items-center justify-center `}
              >
                <a href="#home">
                  <Image
                    src="/dkm-logo-final-01.jpeg"
                    alt="Digital Keys & Marketing Logo"
                    width={100}
                    height={100}
                    className="object-contain brightness-110 rounded-md"
                    priority
                    loading="eager"
                  />
                </a>
              </div>
              <a href="#home">
                <span
                  className={`font-bold text-md tracking-widest uppercase hidden sm:inline ${darkMode ? "text-slate-200" : "text-slate-900"}`}
                >
                  DIGITAL KEYS <span className="text-amber-500">&</span>{" "}
                  MARKETING
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wider uppercase">
              <a
                href="#about"
                className={`transition-colors duration-200 ${darkMode ? "text-slate-400 hover:text-amber-400" : "text-slate-500 hover:text-amber-600"}`}
              >
                About
              </a>
              <a
                href="#vision"
                className={`transition-colors duration-200 ${darkMode ? "text-slate-400 hover:text-amber-400" : "text-slate-500 hover:text-amber-600"}`}
              >
                Vision
              </a>
              <a
                href="#projects"
                className={`transition-colors duration-200 ${darkMode ? "text-slate-400 hover:text-amber-400" : "text-slate-500 hover:text-amber-600"}`}
              >
                Projects
              </a>

              <button
                onClick={toggleTheme}
                type="button"
                className={`px-3 py-2 rounded-xl border font-bold text-[11px] tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  darkMode
                    ? "bg-slate-900 border-slate-800 text-amber-400 hover:border-slate-700"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-inner"
                }`}
                aria-label="Toggle Color System Theme"
              >
                {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
              </button>

              <a
                href="#contact"
                className={`px-5 py-2.5 rounded-lg font-bold shadow-md transition-all duration-300 ${
                  darkMode
                    ? "border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-amber-400/40 hover:text-amber-400"
                    : "bg-slate-900 text-white hover:bg-amber-600"
                }`}
              >
                Partner With Us
              </a>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border text-sm transition-all ${darkMode ? "bg-slate-900 border-slate-800 text-amber-400" : "bg-slate-50 border-slate-200 text-slate-700"}`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-4 pt-2 pb-6 space-y-3 flex flex-col font-semibold text-xs tracking-wider uppercase shadow-inner ${darkMode ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"}`}
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md ${darkMode ? "hover:bg-amber-400 hover:text-black text-slate-300" : "hover:bg-slate-50 text-slate-700"}`}
            >
              About
            </a>
            <a
              href="#vision"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md ${darkMode ? "hover:bg-amber-400 hover:text-black text-slate-300" : "hover:bg-slate-50 text-slate-700"}`}
            >
              Vision
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md ${darkMode ? "hover:bg-amber-400 hover:text-black text-slate-300" : "hover:bg-slate-50 text-slate-700"}`}
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-center py-3 rounded-lg font-bold  transition-all duration-300 ${darkMode ? "bg-slate-900 text-slate-200 border border-slate-800 hover:bg-amber-400 hover:text-black" : "bg-slate-900 text-white"}`}
            >
              Partner With Us
            </a>
          </div>
        )}
      </nav>

      <header
        className={`relative pt-36 pb-20 md:pt-48 md:pb-28 flex flex-col items-center justify-center text-center px-4 overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-slate-950" : "bg-slate-50/50"
        }`}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center w-full">
          <div className="w-full max-w-137.5 mb-10 px-4">
            <div
              className={`relative w-full aspect-video rounded-2xl border overflow-hidden p-2 ${darkMode ? "md:shadow-[1px_1px_100px_lightyellow] shadow-[1px_1px_30px_lightyellow]" : "shadow-2xl"} bg-slate-900 border-slate-900/40`}
            >
              <Image
                src="/dkm-logo-final-00.jpeg"
                alt="Digital Keys & Marketing Cosmic Logo Display"
                fill
                sizes="(max-w-7xl) 100vw, 550px"
                className="object-contain p-4 brightness-190"
                priority
                loading="eager"
              />
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-semibold uppercase tracking-widest ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-400"
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            On-Site Activation × Next.js Engineering
          </div>

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Unlocking Exceptional <br />
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r ${darkMode ? "from-slate-100 via-slate-300 to-amber-200" : "from-slate-900 via-amber-600 to-slate-800"}`}
            >
              Enterprise Exposure
            </span>
          </h1>

          <p
            className={`sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            We build high-performance web structures paired with real-world
            visibility strategies. While we design custom web applications to
            secure your market capture, our partners deploy field tactics to
            elevate your local footprint.
          </p>

          <div className="w-full sm:w-auto">
            <a
              href="#contact"
              className={`block px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-lg transition-all duration-300 ${
                darkMode
                  ? "bg-slate-100 text-slate-950 hover:bg-amber-400"
                  : "bg-slate-900 text-white hover:bg-amber-600"
              }`}
            >
              Initiate Consultation
            </a>
          </div>
        </div>
      </header>

      <section
        id="about"
        className={`py-24 border-y transition-colors duration-300 ${darkMode ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* ✅ HIGH-END PREMIUM CORPORATE WORKSPACE IMAGE EMBED */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-[2px_2px_30px_gray] dark:border-slate-800 group mb-30">
              {/* Elegant overlay gradient to seamlessly match your site theme */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent z-10 pointer-events-none" />
              <Image
                src="/workspace.avif"
                alt="Digital Keys & Marketing Executive Strategy & Rebranding Workspace"
                fill
                sizes="(max-w-7xl) 100vw, 600px"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy" // Keeps your Google SEO page-speed scores 100% perfect
              />
            </div>
            <div>
              <h2 className="text-md uppercase tracking-widest text-amber-600 font-bold mb-3">
                Corporate Profile
              </h2>
              <h3
                className={`text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Fusing Execution with Digital Architecture
              </h3>
              <p
                className={`text-lg leading-relaxed mb-6 font-light ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Traditional marketing groups isolate their scope strictly to
                online ads. Our firm provides a complete, unified solution. We
                deploy active physical rebranding frameworks alongside advanced
                custom web builds.
              </p>
              <p
                className={`text-lg leading-relaxed font-light ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                By maintaining speed, native search optimization hooks, and
                beautiful interfaces, we establish automated client pipelines
                that continuously build asset value for your brand.
              </p>
            </div>

            <div className="flex flex-col gap-10 justify-center items-center mx-auto md:w-200">
              <div
                className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-slate-50 border-slate-200"} md:w-full`}
              >
                <div className="text-amber-600 text-lg font-bold mb-2 w-100">
                  01 / Activation
                </div>
                <h4
                  className={`font-bold text-md mb-1 ${darkMode ? "text-slate-200" : "text-slate-900"}`}
                >
                  Physical Exposure
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  High-touch physical re-branding layouts executed directly in
                  target environments.
                </p>
              </div>
              <div
                className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-slate-50 border-slate-200"} md:w-full`}
              >
                <div className="text-slate-500 text-lg font-bold mb-2">
                  02 / Engineering
                </div>
                <h4
                  className={`font-bold text-md mb-1 ${darkMode ? "text-slate-200" : "text-slate-900"}`}
                >
                  Next.js Frameworks
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Lightweight static generation patterns geared for rapid
                  regional discovery performance.
                </p>
              </div>
              <div
                className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-slate-50 border-slate-200"} md:w-200`}
              >
                <div className="text-amber-600 text-lg font-bold mb-2">
                  03 / Website
                </div>
                <h4
                  className={`font-bold text-md mb-1 ${darkMode ? "text-slate-200" : "text-slate-900"} `}
                >
                  Custom Architecture
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Professional, mobile-first website tailored to your business
                  goals.
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Starting at $600</span>
                </p>
                <p> Excludes setup and automated workflow integration fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION 4: STRATEGIC VISION & APPLICATION DASHBOARD MODULE */}
      <section
        id="vision"
        className={`py-28 border-b transition-colors duration-300 relative overflow-hidden ${
          darkMode
            ? "bg-slate-950 border-slate-900"
            : "bg-slate-50 border-slate-100"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
            darkMode
              ? "bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)]"
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            {/* COLUMN 1: CORPORATE STRATEGY LOGIC & VALUE COPY */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 block">
                  Strategic Mandate
                </span>
                <h2
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Our Vision & Purpose
                </h2>
                <div className="w-12 h-[2px] bg-amber-500/40 mt-4" />
              </div>
              <div className="border-l-2 border-amber-500/60 pl-6 my-6">
                <p
                  className={`text-xl sm:text-2xl font-medium tracking-tight leading-relaxed ${darkMode ? "text-slate-100" : "text-slate-800"}`}
                >
                  "To secure clear, commanding authority for local companies by
                  equipping them with enterprise-grade software applications and
                  pristine real-world brand visibility."
                </p>
              </div>
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t ${darkMode ? "border-slate-900" : "border-slate-200"}`}
              >
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Software Engineering
                  </div>
                  <p
                    className={`text-xs mt-1 font-normal leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Next.js & React frameworks engineered for optimal local
                    index performance.
                  </p>
                </div>
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Field Deployment
                  </div>
                  <p
                    className={`text-xs mt-1 font-normal leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Boots on the ground operations driving local offline market
                    exposure.
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Data Architecture
                  </div>
                  <p
                    className={`text-xs mt-1 font-normal leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Secure Supabase clusters integrated into automated pipeline
                    logic.
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 2: DUAL-THEME HIGH-END OPERATIONAL TERMINAL INTERFACE MOCKUP */}
            <div
              className={`lg:col-span-5 relative min-h-[400px] lg:min-h-full rounded-2xl border overflow-hidden shadow-2xl flex flex-col justify-between group p-1 transition-all duration-300 ${
                darkMode
                  ? "bg-black border-slate-900"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <div
                className={`w-full border-b px-4 py-3 flex items-center justify-between rounded-t-xl z-20 transition-colors ${
                  darkMode
                    ? "bg-slate-950 border-slate-900/60"
                    : "bg-white border-slate-200/60"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-300"}`}
                  />
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-300"}`}
                  />
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-300"}`}
                  />
                </div>
                <div
                  className={`text-[10px] font-mono tracking-wider px-3 py-1 rounded border transition-all ${
                    darkMode
                      ? "text-slate-500 bg-slate-900 border-slate-800/40"
                      : "text-slate-500 bg-white border-slate-200"
                  }`}
                >
                  dkm_terminal_core.config
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-mono ${darkMode ? "bg-slate-900 text-slate-600" : "bg-white text-slate-400"}`}
                >
                  🔒
                </div>
              </div>

              <div
                className={`flex-1 p-5 space-y-4 z-10 font-sans relative transition-colors ${darkMode ? "bg-slate-950/80" : "bg-white/80"}`}
              >
                {/* Pipeline Metrics Display */}
                <div
                  className={`p-4 rounded-xl border shadow-inner space-y-2 transition-all ${darkMode ? "bg-slate-900/40 border-slate-800/60" : "bg-slate-50/80 border-slate-100"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Enterprise Inbound Pipeline
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                      Active Hook ✓
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-2xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      94.8%
                    </span>
                    <span className="text-xs font-semibold text-amber-600">
                      Local Exposure Spike
                    </span>
                  </div>
                  <div
                    className={`w-full h-1.5 rounded-full overflow-hidden flex gap-0.5 p-[1px] ${darkMode ? "bg-slate-900" : "bg-slate-200"}`}
                  >
                    <div className="w-[65%] h-full bg-amber-500 rounded-full" />
                    <div className="w-[20%] h-full bg-amber-600 rounded-full" />
                    <div
                      className={`w-[15%] h-full rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-300"}`}
                    />
                  </div>
                </div>

                {/* Real-time Automation Logs Monitor */}
                <div
                  className={`p-4 rounded-xl border space-y-2.5 font-mono text-[11px] transition-all ${darkMode ? "bg-slate-900/40 border-slate-800/60 text-slate-400" : "bg-slate-50/80 border-slate-100 text-slate-600"}`}
                >
                  <div
                    className={`flex items-center justify-between border-b pb-1.5 ${darkMode ? "border-slate-900" : "border-slate-200"}`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      n8n Execution Logs
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                  <div className="space-y-1 font-medium">
                    <p
                      className={darkMode ? "text-slate-300" : "text-slate-800"}
                    >
                      <span className="text-amber-500">▶</span> Next.js Form
                      Node Mounted.
                    </p>
                    <p
                      className={darkMode ? "text-slate-500" : "text-slate-400"}
                    >
                      <span
                        className={
                          darkMode ? "text-slate-700" : "text-slate-300"
                        }
                      >
                        ▶
                      </span>{" "}
                      Supabase Cluster handshake initiated...
                    </p>
                    <p
                      className={darkMode ? "text-slate-400" : "text-slate-600"}
                    >
                      <span className="text-emerald-500">✔</span> Webhook
                      trigger sync 200 OK.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`w-full border-t px-4 py-2.5 rounded-b-xl flex justify-between items-center text-[9px] font-mono tracking-widest transition-colors ${darkMode ? "bg-slate-950 border-slate-900 text-slate-600" : "bg-white border-slate-200 text-slate-400"}`}
              >
                <span>REBRANDING STACK v2.0.4</span>
                <span>SECURE PIPELINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`py-24 transition-colors duration-300 ${darkMode ? "bg-slate-950" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-3">
              Case Studies
            </h2>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Systems Engineered for Strategic Scale
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className={`group rounded-xl border p-6 shadow-sm transition-all duration-300 ${darkMode ? "bg-slate-900/20 border-slate-800/60 hover:border-amber-400/30" : "bg-slate-50 border-slate-200 hover:border-amber-500/40"}`}
            >
              <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                Architecture / Identity
              </span>
              <h4
                className={`text-lg font-bold mt-1 mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                The Apex Contracting Group
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Deployed localized positioning materials alongside custom
                technical layout architectures. Increased organic regional
                business communication lines by 140% within 45 operating days.
              </p>
            </div>

            <div
              className={`group rounded-xl border p-6 shadow-sm transition-all duration-300 ${darkMode ? "bg-slate-900/20 border-slate-800/60 hover:border-amber-400/30" : "bg-slate-50 border-slate-200 hover:border-amber-500/40"}`}
            >
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Automation / Operations
              </span>
              <h4
                className={`text-lg font-bold mt-1 mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Vanguard Retail Hubs
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Configured secure webhook arrays using Supabase clusters linked
                to automated validation sequences. Saved internal management
                teams 20 structural hours per week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION: CORPORATE HEADQUARTERS ADDRESS & EMBEDDED GOOGLE MAP */}
      <section
        id="location"
        className={`pb-24 pt-10 border-t transition-colors duration-300 relative ${
          darkMode ? "bg-slate-950 border-slate-900" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-24 h-12  bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-md mb-5">
            <Image
              src="/dkm-logo-final-01.jpeg"
              alt="Digital Keys & Marketing Core Form Asset Logo"
              width={80}
              height={40}
              className="object-contain brightness-190"
              loading="eager"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Address Details Block Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-600 font-bold">
                  Global Agency Core
                </span>
                <h3
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Our Headquarters
                </h3>
              </div>

              <div className="space-y-4 text-sm font-normal">
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">📍</span>
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    <strong>Digital Keys & Marketing LLC</strong>
                    <br />
                    8025 Woodrow Rd
                    <br />
                    Stonecrest, GA 30038
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">⏰</span>
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    <strong>Hours of Operation:</strong>
                    <br />
                    Monday – Friday: 9:00 AM – 6:00 PM EST
                    <br />
                    Weekend Dispatch: Closed
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">✉️</span>
                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    <strong>Inquiries:</strong> ops@digitalkeysmarketing.com
                  </p>
                </div>
                {/* 🔹 SOCIAL MEDIA LINK EXPANSION HOOK */}
                <div className="flex items-center gap-4 pt-4">
                  {/* Instagram Anchor Link */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 shadow-md shadow-slate-950/50"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/50 shadow-inner"
                    }`}
                    aria-label="Follow Digital Keys & Marketing on Instagram"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>

                  {/* X / Twitter Anchor Link */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 shadow-md shadow-slate-950/50"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/50 shadow-inner"
                    }`}
                    aria-label="Follow Digital Keys & Marketing on X"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
                    </svg>
                  </a>

                  {/* LinkedIn Anchor Link */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 shadow-md shadow-slate-950/50"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/50 shadow-inner"
                    }`}
                    aria-label="Connect with Digital Keys & Marketing on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ✅ EMBEDDED GOOGLE MAP FRAME */}
            <div
              className={`lg:col-span-7 w-full h-95 sm:h-112.5 relative rounded-2xl border overflow-hidden shadow-xl group transition-all duration-300 ${
                darkMode ? "border-slate-800" : "border-slate-200"
              }`}
            >
              <iframe
                // Securely targets your direct corporate coordinate pin layout in Stonecrest, GA
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13259.756686098852!2d-84.40318792878818!3d33.81388280013965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f505a89add1e3d%3A0x8537ff21165ef27b!2s123%20Atlanta%20Rd%2C%20Atlanta%2C%20GA%2030309!5e0!3m2!1sen!2sus!4v1787512056646!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy" // Native Next.js lazy loading strategy for maximum performance scores
                referrerPolicy="no-referrer-when-downgrade"
                // 🌗 THEME SHIFTER LOGIC: Inverts map geometry colors when dark mode is true to protect eyes
                className="w-full h-full transition-all duration-500"
                title="Digital Keys & Marketing Corporate Office Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`py-24 relative border-t transition-colors duration-300 ${darkMode ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-100"}`}
      >
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          {/* 🔹 FLOATING ACTION SYSTEM ALERT POPUP MODAL */}
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
                  className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Message Transmitted
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  System keys configured. Our automated workflows have
                  initialized your onboarding data sequences.
                </p>
                <button
                  onClick={() => setFormStatus({ type: "", message: "" })}
                  className="mt-6 w-full py-2.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`p-8 md:p-10 rounded-2xl border space-y-8 ${darkMode ? "bg-slate-900/20 border-slate-800/60 shadow-[1px_1px_100px_lightyellow]" : "bg-white border-slate-200"}`}
          >
            <div
              className={`flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4 ${darkMode ? "border-slate-800" : "border-slate-100"}`}
            >
              <div className="text-center sm:text-left">
                <h3
                  className={`text-3xl font-bold tracking-wider uppercase ${darkMode ? "text-white" : "text-slate-900"}`}
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
                className={`block text-sm font-bold uppercase tracking-wider mb-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Select Required Capabilities
              </label>
              <div className="flex flex-wrap gap-2.5 mb-15">
                {availableNeeds.map((need, idx) => {
                  const isSelected = selectedNeeds.includes(need);
                  return (
                    <button
                      key={idx}
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
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:border-amber-500 ${darkMode ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  className={`w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:border-amber-500 ${darkMode ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2"
              >
                Company / Corporate Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Apex Logistics Ltd"
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:border-amber-500 ${darkMode ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              />
            </div>

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
                className={`w-full px-4 py-3 rounded-lg text-sm resize-none transition-all focus:outline-none focus:border-amber-500 ${darkMode ? "bg-slate-950 border-slate-200 text-slate-200 placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              />
            </div>

            {formStatus.message && (
              <div
                className={`p-4 rounded-xl border text-xs font-semibold ${formStatus.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}
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

      <footer
        className={`py-12 border-t text-center text-[10px] tracking-wider uppercase font-medium transition-colors duration-300 ${
          darkMode
            ? "bg-slate-950 border-slate-900 text-slate-500"
            : "bg-white border-slate-100 text-slate-400"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            © {new Date().getFullYear()} DIGITAL KEYS & MARKETING. All Rights
            Reserved.
          </p>
          <p className="max-w-md mx-auto leading-relaxed normal-case tracking-normal font-normal text-slate-400">
            Built via premium Next.js compilation architectures, Supabase
            database layers, and n8n automated webhook workflows.
          </p>
        </div>
      </footer>
    </div>
  );
}
