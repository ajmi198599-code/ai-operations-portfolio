"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  copy?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  copy,
  children,
  className = ""
}: SectionShellProps) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          {copy ? <p className="mt-5 text-base leading-8 text-steel sm:text-lg">{copy}</p> : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
