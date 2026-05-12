"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { LiveDemoSection } from "./live-demo-section";
import { Navigation } from "./navigation";
import { ProjectsSection } from "./projects-section";
import { WorkflowLab } from "./workflow-lab";

export function PortfolioExperience() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-platinum">
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-obsidian"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <motion.div
              className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-glow backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <div className="absolute inset-4 rounded-full border border-gold/30" />
              <div className="absolute inset-10 animate-orbit rounded-full border border-dashed border-cyanbeam/30" />
              <motion.div
                className="h-16 w-16 rounded-full border border-gold/40 bg-gold/10 shadow-glow"
                animate={{ scale: [1, 1.16, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="absolute bottom-10 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-steel">
                Initializing Ops
              </span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WorkflowLab />
      <LiveDemoSection />
      <ContactSection />
    </main>
  );
}
