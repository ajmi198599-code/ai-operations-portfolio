"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { contactLinks } from "@/lib/data";
import { SectionShell } from "./section-shell";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  }

  return (
    <SectionShell
      id="contact"
      eyebrow="LinkedIn / Contact"
      title="Available for strategic projects that need operational clarity and secure digital execution."
      copy="Ideal for executive teams, security departments, operations leaders, and organizations modernizing internal systems with practical AI workflows."
      className="pb-12"
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.aside
          className="glass-panel relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-4 py-2 text-sm font-semibold text-emerald-100">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
              </span>
              Available for Strategic Projects
            </div>

            <div className="mt-8 grid h-24 w-24 place-items-center rounded-[1.5rem] border border-gold/25 bg-gold/10 text-gold shadow-glow">
              <ShieldCheck size={38} />
            </div>
            <h3 className="mt-7 text-2xl font-semibold text-white">Saudi Security & AI Operations Professional</h3>
            <p className="mt-4 leading-8 text-steel">
              Focused on building practical digital systems for security operations,
              infrastructure coordination, reporting automation, and leadership visibility.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-white transition hover:border-gold/35 hover:bg-gold/10"
              >
                <span className="flex items-center gap-3">
                  <Linkedin size={19} className="text-gold" />
                  LinkedIn Profile
                </span>
                <Send size={16} />
              </a>
              <a
                href={contactLinks.email}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-white transition hover:border-gold/35 hover:bg-gold/10"
              >
                <span className="flex items-center gap-3">
                  <Mail size={19} className="text-gold" />
                  hello@example.com
                </span>
                <Send size={16} />
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/18 p-4 text-steel">
                <MapPin size={19} className="text-gold" />
                Saudi Arabia • Remote / Hybrid Strategic Engagements
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-insetPanel backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              Name
              <input className="field-input" name="name" placeholder="Your name" required />
            </label>
            <label className="field-label">
              Email
              <input className="field-input" type="email" name="email" placeholder="you@company.com" required />
            </label>
          </div>
          <label className="field-label mt-4">
            Project Focus
            <select className="field-input" name="focus" defaultValue="Security Operations">
              <option>Security Operations</option>
              <option>AI Workflow Design</option>
              <option>Infrastructure Coordination</option>
              <option>Digital Dashboard Concept</option>
              <option>Strategic Consultation</option>
            </select>
          </label>
          <label className="field-label mt-4">
            Message
            <textarea
              className="field-input min-h-40 resize-none"
              name="message"
              placeholder="Briefly describe the opportunity, system, or operational challenge."
              required
            />
          </label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-steel">
              {sent ? "Message staged. Connect this form to your preferred email service before launch." : "Form-ready layout for Vercel deployment."}
            </p>
            <button type="submit" className="premium-button bg-gold text-obsidian hover:bg-white">
              Send Inquiry
              <Send size={17} />
            </button>
          </div>
        </motion.form>
      </div>

      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-steel">
        <p>Operational Intelligence Portfolio • Security Operations • AI Workflows • Digital Systems</p>
      </footer>
    </SectionShell>
  );
}
