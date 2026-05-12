"use client";

import { motion } from "framer-motion";

type ProjectPreviewProps = {
  title: string;
  accent?: "gold" | "cyan" | "silver" | string;
  compact?: boolean;
};

const accentStyles = {
  gold: "from-gold/80 via-gold/35 to-transparent",
  cyan: "from-cyanbeam/80 via-cyanbeam/35 to-transparent",
  silver: "from-platinum/70 via-white/25 to-transparent"
};

export function ProjectPreview({ title, accent = "gold", compact = false }: ProjectPreviewProps) {
  const gradient = accentStyles[accent as keyof typeof accentStyles] ?? accentStyles.gold;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/32 ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <div>
          <div className="h-2.5 w-24 rounded-full bg-white/16" />
          <div className="mt-2 h-2 w-16 rounded-full bg-white/8" />
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gold/75" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyanbeam/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
      </div>
      <div className={`grid gap-3 pt-3 ${compact ? "grid-cols-[0.85fr_1.15fr]" : "grid-cols-[0.8fr_1.2fr]"}`}>
        <div className="space-y-2">
          {[82, 64, 74, 48].map((width, index) => (
            <div key={width} className="rounded-xl border border-white/8 bg-white/[0.035] p-2">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${index % 2 ? "bg-cyanbeam/70" : "bg-gold/70"}`} />
                <div className="h-2 rounded-full bg-white/12" style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="relative min-h-36 rounded-xl border border-white/8 bg-white/[0.025] p-3">
          <div className="absolute inset-0 command-grid opacity-35" />
          <motion.div
            className={`absolute left-3 right-3 top-5 h-px bg-gradient-to-r ${gradient}`}
            animate={{ x: ["-8%", "8%", "-8%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative grid h-full grid-cols-3 items-end gap-2">
            {[54, 78, 38, 66, 88, 46].map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                className={`rounded-t-lg bg-gradient-to-t ${gradient}`}
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0.2 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 truncate text-xs uppercase tracking-[0.2em] text-steel">{title}</p>
    </div>
  );
}
