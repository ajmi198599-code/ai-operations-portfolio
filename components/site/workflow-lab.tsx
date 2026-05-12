"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/lib/data";
import { SectionShell } from "./section-shell";

export function WorkflowLab() {
  return (
    <SectionShell
      id="workflow"
      eyebrow="Workflow Lab"
      title="From idea to deployable operating system."
      copy="A visual build path for converting strategic ideas into field-ready dashboards, AI-assisted routines, and measurable operating rhythms."
      className="bg-gradient-to-b from-obsidian via-[#0b0f13] to-midnight"
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent lg:block" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-110px" }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
            >
              <div className="glass-panel group relative min-h-64 overflow-hidden rounded-[1.4rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow">
                <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyanbeam/8 blur-2xl transition group-hover:bg-gold/12" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.26em] text-steel">
                    Phase 0{index + 1}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/22 text-gold">
                    <step.icon size={20} />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-steel">{step.body}</p>
                <div className="absolute bottom-5 left-5 right-5 h-1 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold via-platinum to-cyanbeam"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${60 + index * 8}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + index * 0.08 }}
                  />
                </div>
              </div>
              {index < workflowSteps.length - 1 ? (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-obsidian text-gold shadow-glow lg:grid">
                  <ArrowRight size={17} />
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/24 p-4 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">System Blueprint</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Workflow intelligence map</h3>
            <p className="mt-4 leading-8 text-steel">
              Every workflow is treated as an operating asset: who owns it, what data enters it,
              how AI assists it, where humans approve it, and how leadership sees the outcome.
            </p>
          </div>
          <div className="relative min-h-64 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <div className="absolute inset-0 command-grid opacity-40" />
            {["Input", "Rules", "AI", "Review", "Action"].map((node, index) => (
              <motion.div
                key={node}
                className="absolute rounded-2xl border border-white/10 bg-obsidian/82 px-4 py-3 text-sm font-semibold text-white shadow-cyan backdrop-blur-xl"
                style={{
                  left: `${8 + index * 18}%`,
                  top: index % 2 === 0 ? "26%" : "58%"
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.6, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
              >
                {node}
              </motion.div>
            ))}
            <svg className="absolute inset-0 h-full w-full" role="img" aria-label="Animated workflow connection diagram">
              <motion.path
                d="M 68 88 C 190 40, 210 190, 335 145 S 520 40, 640 130"
                fill="none"
                stroke="rgba(212,175,55,0.58)"
                strokeWidth="2"
                strokeDasharray="8 10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
