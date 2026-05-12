"use client";

import { motion } from "framer-motion";
import { Languages, LineChart, Shield, Workflow } from "lucide-react";
import { timeline } from "@/lib/data";
import { SectionShell } from "./section-shell";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="Executive Profile"
      title="Operational leadership shaped for modern security and AI-enabled coordination."
      copy="Built for environments where decisions need discipline, communication needs precision, and digital systems need to make people faster rather than louder."
      className="bg-gradient-to-b from-obsidian via-midnight to-obsidian"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass-panel relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Saudi Operations Professional</p>
          <h3 className="mt-5 text-2xl font-semibold leading-snug text-white sm:text-3xl">
            Security-aware, infrastructure-literate, AI-curious, and fluent in the language of operations.
          </h3>
          <p className="mt-6 leading-8 text-steel">
            This portfolio presents a professional profile focused on command-center thinking:
            turning incidents, facilities, teams, vendors, and leadership needs into structured
            digital workflows. The work sits between security operations, AI-assisted productivity,
            infrastructure coordination, and bilingual executive communication.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Shield, title: "Security Systems", text: "Incident, access, CCTV, patrol, gate, and escalation workflows." },
              { icon: Workflow, title: "AI Workflows", text: "Structured prompts, triage logic, summaries, and reporting automation." },
              { icon: LineChart, title: "Operations Insight", text: "Metrics, readiness views, dashboards, and performance signals." },
              { icon: Languages, title: "Bilingual Clarity", text: "Arabic and English communication for teams, vendors, and leadership." }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/18 p-4">
                <item.icon className="text-gold" size={20} />
                <h4 className="mt-4 font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-steel">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-gold/70 via-white/10 to-cyanbeam/60 sm:block" />
          <div className="grid gap-5">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 pl-5 shadow-insetPanel backdrop-blur-xl sm:ml-12 sm:pl-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <span className="absolute -left-[3.15rem] top-6 hidden h-10 w-10 place-items-center rounded-full border border-gold/30 bg-obsidian text-xs font-semibold text-gold shadow-glow sm:grid">
                  {item.year}
                </span>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/8 text-gold">
                    <item.icon size={21} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7 text-steel">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
