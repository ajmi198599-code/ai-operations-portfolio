"use client";

import { motion } from "framer-motion";
import { AlertCircle, BellRing, Check, Gauge, MoreHorizontal } from "lucide-react";
import { accessLogs, alertFeed, dashboardMetrics, shiftTeams } from "@/lib/data";
import { SectionShell } from "./section-shell";

const statusStyles: Record<string, string> = {
  Cleared: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Review: "border-gold/25 bg-gold/10 text-gold",
  Assigned: "border-cyanbeam/20 bg-cyanbeam/10 text-cyanbeam",
  "AI Alert": "border-rose-300/20 bg-rose-300/10 text-rose-100"
};

export function LiveDemoSection() {
  return (
    <SectionShell
      id="demo"
      eyebrow="Live System Demo"
      title="A realistic enterprise dashboard layer for security and operational intelligence."
      copy="The demo uses simulated data to show the type of operational surface an executive, SOC lead, or facilities coordinator could use every day."
    >
      <motion.div
        className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#06090f]/92 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75 }}
      >
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-steel">Enterprise Security Console</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Operations Intelligence Dashboard</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Live", "AI Enabled", "Shift Synced"].map((label) => (
              <span key={label} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-platinum">
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid content-start gap-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-insetPanel"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/22 text-gold">
                      <metric.icon size={18} />
                    </span>
                    <span className="text-xs font-semibold text-cyanbeam">{metric.delta}</span>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-steel">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-gold">Access Control Logs</p>
                    <h4 className="mt-1 font-semibold text-white">Recent security movement</h4>
                  </div>
                  <MoreHorizontal className="text-steel" size={20} />
                </div>
                <div className="space-y-2">
                  {accessLogs.map((log) => (
                    <div key={`${log.time}-${log.zone}`} className="grid gap-3 rounded-xl border border-white/8 bg-black/18 p-3 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center">
                      <span className="text-sm font-semibold text-white">{log.time}</span>
                      <span>
                        <span className="block text-sm text-platinum">{log.event}</span>
                        <span className="block text-xs text-steel">{log.zone}</span>
                      </span>
                      <span className={`w-fit rounded-full border px-2.5 py-1 text-xs ${statusStyles[log.status]}`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/22 text-gold">
                    <Gauge size={18} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-steel">Shift Coordination</p>
                    <h4 className="font-semibold text-white">Team readiness</h4>
                  </div>
                </div>
                <div className="space-y-4">
                  {shiftTeams.map((team) => (
                    <div key={team.name}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium text-white">{team.name}</span>
                        <span className="text-steel">{team.role}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold via-platinum to-cyanbeam"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${team.readiness}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="absolute inset-0 command-grid opacity-30" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Incident Metrics</p>
                  <h4 className="mt-1 font-semibold text-white">Zone pressure map</h4>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/22 text-gold">
                  <AlertCircle size={18} />
                </span>
              </div>
              <div className="relative mt-6 aspect-square rounded-full border border-white/10 bg-black/24">
                <div className="absolute inset-7 rounded-full border border-dashed border-gold/22" />
                <div className="absolute inset-16 rounded-full border border-cyanbeam/16" />
                <motion.span
                  className="absolute left-1/2 top-1/2 h-[44%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-cyanbeam to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
                {[
                  ["24%", "35%", "bg-gold"],
                  ["64%", "28%", "bg-cyanbeam"],
                  ["42%", "66%", "bg-white"],
                  ["72%", "72%", "bg-gold"]
                ].map(([left, top, color]) => (
                  <span key={`${left}-${top}`} className={`absolute h-3 w-3 rounded-full ${color} shadow-glow`} style={{ left, top }} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/22 text-gold">
                  <BellRing size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-steel">AI-Generated Alerts</p>
                  <h4 className="font-semibold text-white">Assistant feed</h4>
                </div>
              </div>
              <div className="space-y-2">
                {alertFeed.map((alert) => (
                  <div key={alert} className="flex gap-3 rounded-xl border border-white/8 bg-black/18 p-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/12 text-gold">
                      <Check size={13} />
                    </span>
                    <p className="text-sm leading-6 text-steel">{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
