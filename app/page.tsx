"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, X } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

// ─── COMING SOON POPUP ────────────────────────────────────────────────────────
const ComingSoonPopup = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease }}
        className="bg-[#0a0a0a] border border-white/10 p-8 max-w-sm w-full mx-4 text-center space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-8 h-8 bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto">
          <span className="text-cyan-400 text-sm font-mono">!</span>
        </div>
        <h3 className="text-base font-semibold text-white">Coming soon</h3>
        <p className="text-sm text-white/40 leading-relaxed">
          This page isn't ready yet. We'll let you know when it is.
        </p>
        <button
          onClick={onClose}
          className="mt-2 text-xs text-white/30 hover:text-white transition-colors border border-white/10 px-4 py-2 w-full hover:border-white/20"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const SparkLogo = () => (
  <a href="/" className="flex items-center gap-2.5 group no-underline">
    <div className="w-5 h-5 bg-cyan-400 group-hover:bg-cyan-300 transition-colors duration-200 shrink-0 flex items-center justify-center">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <rect x="0" y="0" width="9" height="2.5" fill="#000" />
        <rect x="0" y="3.25" width="5.5" height="2.5" fill="#000" />
        <rect x="0" y="6.5" width="9" height="2.5" fill="#000" />
      </svg>
    </div>
    <span className="text-sm font-semibold tracking-tight text-white">SparkDB</span>
  </a>
);

// ─── TYPING ANIMATION ─────────────────────────────────────────────────────────
const engines = ["Postgres", "MongoDB", "MySQL", "Redis", "SQLite"];

const TypingEngine = () => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = engines[idx];
    if (!deleting && displayed === target) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % engines.length);
      return;
    }
    const speed = deleting ? 45 : 75;
    const t = setTimeout(() => {
      setDisplayed(deleting ? displayed.slice(0, -1) : target.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-cyan-400 font-mono">
      {displayed}
      <span className="opacity-60 animate-pulse">|</span>
    </span>
  );
};

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const features = [
  "Instant connection strings",
  "Visual table editor",
  "SDK auth built-in",
  "15+ database engines",
  "Multi-region replication",
  "99.99% uptime SLA",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SparkLandingPage() {
  const [showPopup, setShowPopup] = useState(false);

  const comingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {showPopup && <ComingSoonPopup onClose={() => setShowPopup(false)} />}

      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkLogo />

          <div className="hidden md:flex items-center gap-7 text-sm text-white/40">
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Docs</a>
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Pricing</a>
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Changelog</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Sign in — real */}
            <a href="/dashboard" className="text-sm text-white/40 hover:text-white transition-colors">
              Sign in
            </a>
            {/* Start for free — real */}
            <a
              href="/dashboard"
              className="text-sm font-medium bg-cyan-400 text-black px-4 py-1.5 hover:bg-cyan-300 transition-colors"
            >
              Start for free
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-white/30 border border-white/10 px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Now in public beta
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-white">
            Database infrastructure<br />
            for&nbsp;<TypingEngine />
          </h1>

          <p className="text-lg text-white/40 leading-relaxed max-w-xl mx-auto">
            SparkDB gives you a production-ready database in seconds.
            One connection string. One API key. Any engine.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            {/* Create free database — real */}
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm font-medium px-5 py-2.5 hover:bg-cyan-300 transition-colors"
            >
              Create free database
              <ArrowRight className="w-4 h-4" />
            </a>
            {/* Read the docs — coming soon */}
            <a
              href="#"
              onClick={comingSoon}
              className="inline-flex items-center gap-2 text-sm text-white/40 border border-white/10 px-5 py-2.5 hover:text-white hover:border-white/20 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              Read the docs
            </a>
          </div>
        </motion.div>
      </section>

      <div className="border-t border-white/5" />

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center space-y-10"
        >
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest">
            Everything included
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((label) => (
              <span
                key={label}
                className="text-sm text-white/40 border border-white/10 px-4 py-2 cursor-default"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="border-t border-white/5" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your database in two seconds.
          </h2>
          <p className="text-white/40 text-base">
            Free to start. No credit card required.
          </p>
          {/* Create a free project — coming soon */}
          <a
            href="#"
            onClick={comingSoon}
            className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm font-medium px-6 py-2.5 hover:bg-cyan-300 transition-colors"
          >
            Create a free project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkLogo />
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={comingSoon} className="hover:text-white transition-colors">Status</a>
          </div>
          <p className="text-[11px] font-mono text-white/15 hidden md:block">
            © 2026 Spark Systems
          </p>
        </div>
      </footer>
    </div>
  );
}