"use client";

import { motion } from "framer-motion";

const nodes = [
  { left: "12%", top: "28%", delay: 0.1 },
  { left: "27%", top: "68%", delay: 0.7 },
  { left: "46%", top: "22%", delay: 1.2 },
  { left: "72%", top: "34%", delay: 0.4 },
  { left: "84%", top: "70%", delay: 1.6 },
  { left: "58%", top: "78%", delay: 1 }
];

export function CommandBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-radial-ops" />
      <div className="absolute inset-0 command-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px bg-panel-line" />
      <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyanbeam/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-[12%] top-[18%] h-80 w-80 rounded-full bg-cyanbeam/8 blur-3xl animate-drift" />
      <div className="absolute bottom-[8%] right-[10%] h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-drift" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
      <div className="absolute left-0 top-0 h-32 w-full animate-scan bg-gradient-to-b from-transparent via-cyanbeam/10 to-transparent" />

      {nodes.map((node, index) => (
        <motion.span
          key={`${node.left}-${node.top}`}
          className="absolute h-3 w-3 rounded-full border border-gold/50 bg-gold/20 shadow-glow"
          style={{ left: node.left, top: node.top }}
          initial={{ opacity: 0.4, scale: 0.8 }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.35, 0.9] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: node.delay }}
        >
          <span className="absolute left-1/2 top-1/2 h-20 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold/30 to-transparent" />
          {index % 2 === 0 ? (
            <span className="absolute left-1/2 top-1/2 h-px w-36 -translate-y-1/2 bg-gradient-to-r from-gold/25 to-transparent" />
          ) : null}
        </motion.span>
      ))}
    </div>
  );
}
