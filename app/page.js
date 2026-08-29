"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Vision from "./components/Vision";
import Projects from "./components/Projects";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

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

  const themeClass = darkMode
    ? "bg-slate-950 text-slate-300 selection:text-amber-300 selection:bg-amber-400/30"
    : "bg-white text-slate-800 selection:text-amber-900 selection:bg-amber-400/30";

  return (
    <div
      id="home"
      className={`min-h-screen font-sans transition-colors duration-300 ${themeClass}`}
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

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Vision darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Location darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
