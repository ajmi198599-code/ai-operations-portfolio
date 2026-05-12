"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, BrainCircuit, LockKeyhole, RadioTower } from "lucide-react";
import { capabilityStats, toolchain } from "@/lib/data";
import { CommandBackground } from "./command-background";

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:px-10">
      <CommandBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.05 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-steel backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-gold shadow-glow" />
            Operational Intelligence Portfolio
          </div>
          <h1 className="mt-7 max-w-5xl font-display text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Building AI-Driven Operational Systems
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-platinum/82 sm:text-xl">
            Security Operations • AI Workflows • Infrastructure Coordination • Digital Innovation
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-steel">
            A premium command-center portfolio for translating operational complexity into secure,
            measurable, executive-ready digital systems.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="premium-button group bg-white text-obsidian hover:bg-gold">
              View Projects
              <ArrowDownRight className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" size={18} />
            </a>
            <a href="#contact" className="premium-button border border-white/12 bg-white/[0.045] text-white backdrop-blur-xl hover:border-gold/50 hover:bg-gold/10">
              Contact
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {capabilityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-panel rounded-2xl p-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.22 + index * 0.08 }}
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-steel">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:ml-auto"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.2 }}
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gold/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/38 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-steel">Live Command Surface</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Operational Control</h2>
              </div>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-gold/80" />
                <span className="h-3 w-3 rounded-full bg-cyanbeam/80" />
                <span className="h-3 w-3 rounded-full bg-white/40" />
              </div>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="relative mx-auto aspect-square max-w-64 rounded-full border border-gold/20 bg-black/30">
                  <div className="absolute inset-4 rounded-full border border-dashed border-cyanbeam/20" />
                  <div className="absolute inset-11 rounded-full border border-white/10" />
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[46%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-gold to-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute left-[28%] top-[38%] h-3 w-3 rounded-full bg-gold shadow-glow" />
                  <div className="absolute bottom-[24%] right-[29%] h-2.5 w-2.5 rounded-full bg-cyanbeam shadow-cyan" />
                  <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                    <LockKeyhole className="text-gold" size={26} />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: BrainCircuit, label: "AI Alert Model", value: "96.4%", bar: "w-[96%]" },
                  { icon: RadioTower, label: "Escalation Readiness", value: "ACTIVE", bar: "w-[84%]" },
                  { icon: LockKeyhole, label: "Security Posture", value: "STABLE", bar: "w-[91%]" }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/20 text-gold">
                          <item.icon size={18} />
                        </span>
                        <span className="text-sm text-platinum">{item.label}</span>
                      </div>
                      <span className="text-xs font-semibold tracking-[0.16em] text-white">{item.value}</span>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r from-gold to-cyanbeam ${item.bar}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.4, delay: 1.5 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-0 right-0 z-10 overflow-hidden border-y border-white/8 bg-white/[0.025] py-3 backdrop-blur-lg">
        <div className="flex min-w-max animate-marquee gap-8 text-xs uppercase tracking-[0.26em] text-steel">
          {[...toolchain, ...toolchain].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              {item}
              <span className="h-1 w-1 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
