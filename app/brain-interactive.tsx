"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

interface HotspotData {
  id: number;
  label: string;
  title: string;
  region: string;
  x: string;
  y: string;
  content: string;
}

// ══════════════════════════════════════════════════════════════════════
// HOTSPOT DATA
// ══════════════════════════════════════════════════════════════════════

const HOTSPOTS: HotspotData[] = [
  {
    id: 1,
    label: "01",
    title: "Brain Reward System",
    region: "Overall Brain Architecture",
    x: "44%",
    y: "36%",
    content:
      "The brain's reward and cognitive control systems involve several interconnected " +
      "structures, primarily the Ventral Tegmental Area (VTA), nucleus accumbens, striatum, " +
      "and prefrontal cortex (PFC), all of which work together to regulate reward, motivation, " +
      "decision-making, and habit formation.",
  },
  {
    id: 2,
    label: "02",
    title: "Midbrain Reward Circuit",
    region: "VTA & Nucleus Accumbens",
    x: "46%",
    y: "57%",
    content:
      "The VTA contains dopamine-producing neurons that initiate reward signaling, while " +
      "the nucleus accumbens and striatum process reinforcement and reward signaling. This " +
      "shifts behavior toward habit-based responses with repeated stimulation. As nicotine " +
      "mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is " +
      "released in the nucleus accumbens, which in turn hinders the reward pathway.",
  },
  {
    id: 3,
    label: "03",
    title: "Prefrontal Cortex",
    region: "Frontal Lobe — Executive Control",
    x: "22%",
    y: "26%",
    content:
      "The PFC is responsible for executive functions such as planning, attention, and " +
      "impulse control, and is one of the last brain regions to mature, resulting in extreme " +
      "vulnerability to addiction during adolescence. These regions are connected through " +
      "dopamine and acetylcholine signaling pathways that regulate learning and reinforcement. " +
      "With repeated exposure to strong stimuli such as nicotine, the system undergoes " +
      "neuroplastic changes that can alter gene expression, synaptic reorganization, and " +
      "changes in dendritic spine density and length over time.",
  },
];

// ══════════════════════════════════════════════════════════════════════
// MAIN INTERACTIVE COMPONENT
// ══════════════════════════════════════════════════════════════════════

export default function BrainInteractive() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedHotspot = HOTSPOTS.find((h) => h.id === selectedId) ?? null;

  return (
    <>
      {/* ── Brain image with hotspot buttons ── */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Dopamine pathway legend */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mb-6 px-5 py-2.5 rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm w-fit mx-auto">
          {[
            { color: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]", label: "Meso-cortical" },
            { color: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]", label: "Meso-limbic" },
            { color: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]", label: "Nigrostriatal" },
          ].map(({ color, label }) => (
            <span
              key={label}
              className="font-mono text-[9px] tracking-[0.2em] text-gray-400 uppercase flex items-center gap-1.5"
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} aria-hidden />
              {label}
            </span>
          ))}
        </div>

        <div
          className={[
            "relative w-full aspect-[754/639] rounded-2xl overflow-hidden",
            "bg-[#060a12] border border-white/[0.07]",
            "shadow-[0_0_90px_rgba(59,130,246,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]",
          ].join(" ")}
        >
          <Image
            src="/brain.png"
            alt="Sagittal brain cross-section showing dopamine pathways"
            fill
            loading="eager"
            className="object-contain pointer-events-none"
            sizes="(max-width: 768px) 100vw, 672px"
            suppressHydrationWarning
          />

          {/* CRT scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
            }}
            suppressHydrationWarning
            aria-hidden
          />

          {/* Corner labels */}
          <span className="absolute top-3 left-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
            BIGGY·BRAIN
          </span>
          <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
            INTERACTIVE
          </span>

          {/* ── Hotspot buttons ── */}
          {HOTSPOTS.map((hs) => {
            const isSelected = selectedId === hs.id;
            return (
              <motion.div
                key={hs.id}
                className="absolute z-30 flex items-center justify-center pointer-events-auto"
                style={{
                  left: hs.x,
                  top: hs.y,
                  transform: "translate(-50%, -50%)",
                  width: "40px",
                  height: "40px",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: hs.id * 0.15 }}
              >
                {/* Outer pulsing ring for interactive feedback */}
                {!isSelected && (
                  <span
                    className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-60 pointer-events-none"
                    style={{ animationDuration: "2.5s" }}
                  />
                )}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full border border-cyan-400 animate-pulse opacity-30 pointer-events-none shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedId(hs.id);
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedId(hs.id);
                  }}
                  aria-label={`${hs.title} — click to read more`}
                  className={[
                    "relative w-10 h-10 rounded-full",
                    "font-mono text-[10px] font-black tracking-wide",
                    "border-2 flex items-center justify-center",
                    "cursor-pointer select-none transition-all duration-200",
                    isSelected
                      ? "bg-cyan-400 border-cyan-300 text-gray-950 shadow-[0_0_20px_rgba(34,211,238,0.7)] scale-110"
                      : "bg-[#070b13]/80 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-950 hover:scale-105 active:scale-95 backdrop-blur-sm",
                  ].join(" ")}
                >
                  {hs.label}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Legend buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
          {HOTSPOTS.map((hs) => {
            const isSelected = selectedId === hs.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => setSelectedId(hs.id)}
                onPointerDown={() => setSelectedId(hs.id)}
                className={[
                  "flex items-center gap-2 font-mono text-[10px] tracking-wider",
                  "px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none",
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                    : "bg-white/[0.01] border-white/[0.06] text-gray-500 hover:border-gray-500 hover:text-gray-300 hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <span
                  className={[
                    "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold",
                    "transition-colors duration-200",
                    isSelected
                      ? "bg-cyan-400 border-cyan-300 text-gray-950"
                      : "border-gray-600 text-gray-500",
                  ].join(" ")}
                >
                  {hs.label}
                </span>
                {hs.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedHotspot && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ pointerEvents: "auto" }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedId(null)}
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full max-w-[460px] self-end md:self-auto mb-2 md:mb-0"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <div
                className={[
                  "rounded-2xl overflow-hidden",
                  "bg-slate-950/75 backdrop-blur-xl border border-white/10",
                  "shadow-[0_0_50px_rgba(6,182,212,0.15),0_25px_50px_-12px_rgba(0,0,0,0.8)]",
                ].join(" ")}
              >
                {/* Accent gradient bar */}
                <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                      {selectedHotspot.region}
                    </p>
                    <h2 className="text-[1.25rem] font-black tracking-tight text-white leading-snug">
                      {selectedHotspot.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    aria-label="Close"
                    className={[
                      "flex-shrink-0 ml-4 w-7 h-7 rounded-full border border-white/10",
                      "flex items-center justify-center text-xs leading-none",
                      "text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20",
                      "transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
                    ].join(" ")}
                  >
                    ✕
                  </button>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Body */}
                <p className="px-6 pt-4 pb-5 text-[13px] text-gray-300 leading-relaxed font-light">
                  {selectedHotspot.content}
                </p>

                {/* Footer meta */}
                <div className="px-6 pb-4 flex items-center justify-between border-t border-white/[0.04] pt-3">
                  <span className="font-mono text-[9px] text-gray-600 select-none tracking-wider">
                    HOTSPOT_{selectedHotspot.label}
                  </span>
                  <span className="font-mono text-[9px] text-cyan-400/50 select-none tracking-wider">
                    CLICK OUTSIDE TO CLOSE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
