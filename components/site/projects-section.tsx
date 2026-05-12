"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, LayoutDashboard, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Project, projects } from "@/lib/data";
import { ProjectPreview } from "./project-preview";
import { SectionShell } from "./section-shell";

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <SectionShell
      id="projects"
      eyebrow="Featured Projects"
      title="Interactive systems concepts with boardroom polish and field-level practicality."
      copy="Each concept is framed like an enterprise product: visible workflow logic, clear operational value, and interface thinking that can move from prototype to deployment."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 shadow-insetPanel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.06] hover:shadow-glow"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.62, delay: index * 0.05 }}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/8 blur-2xl transition group-hover:bg-gold/14" />
            <ProjectPreview title={project.title} accent={project.accent} />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gold">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{project.title}</h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/20 text-gold transition group-hover:rotate-3 group-hover:border-gold/40">
                <project.icon size={20} />
              </span>
            </div>
            <p className="mt-4 min-h-20 text-sm leading-7 text-steel">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-platinum/80">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="mt-6 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-gold/10"
            >
              Open System View
              <ArrowUpRight size={17} />
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </SectionShell>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/72 px-4 py-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-white/12 bg-obsidian/96 p-4 shadow-2xl shadow-black/60 sm:p-6"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.28 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-4xl">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/8 text-white transition hover:bg-white/14"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 pt-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ProjectPreview title={project.title} accent={project.accent} />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <CheckCircle2 className="text-gold" size={18} />
                  <p className="mt-3 text-sm font-semibold text-white">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/22 text-gold">
                <LayoutDashboard size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-steel">Workflow Explanation</p>
                <h4 className="font-semibold text-white">Enterprise-ready operating logic</h4>
              </div>
            </div>
            <p className="mt-5 leading-8 text-steel">{project.workflow}</p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Dashboard Screenshots</p>
              <div className="mt-3 grid gap-3">
                {project.screens.map((screen, index) => (
                  <div key={screen} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/8 text-xs font-semibold text-platinum">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-white">{screen}</span>
                    </div>
                    <span className="h-2 w-16 rounded-full bg-gradient-to-r from-gold/80 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
