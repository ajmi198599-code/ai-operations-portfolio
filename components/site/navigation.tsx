"use client";

import { motion } from "framer-motion";
import { Menu, Radar, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/data";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-300 sm:px-8 ${
        scrolled ? "bg-obsidian/72 backdrop-blur-2xl" : "bg-transparent"
      }`}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 shadow-insetPanel backdrop-blur-xl sm:px-5">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold shadow-glow">
            <Radar size={19} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-white">Ops Intelligence</span>
            <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-steel">
              Saudi Professional
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-black/20 p-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-steel transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-obsidian transition hover:bg-gold md:flex">
          Contact
          <Send size={15} />
        </a>

        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/8 text-white lg:hidden"
        >
          <Menu size={19} />
        </button>
      </nav>

      {open ? (
        <motion.div
          className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-white/10 bg-obsidian/92 p-3 shadow-glow backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-steel transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      ) : null}
    </motion.header>
  );
}
