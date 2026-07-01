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
// HOTSPOT DATA (Updated from copy)
// ══════════════════════════════════════════════════════════════════════

const HOTSPOTS: HotspotData[] = [
  {
    id: 1,
    label: "1",
    title: "Reward & Cognitive Control",
    region: "Overall Architecture",
    x: "55%",
    y: "45%",
    content:
      "The brain’s reward and cognitive control systems involve several interconnected structures, primarily the Ventral Tegmental Area (VTA), nucleus accumbens, striatum, and prefrontal cortex (PFC), all of which work together to regulate reward, motivation, decision-making, and habit formation."
  },
  {
    id: 3,
    label: "3",
    title: "Prefrontal Cortex",
    region: "PFC",
    x: "40%",
    y: "50%",
    content:
      "The PFC is responsible for executive functions such as planning, attention, and impulse control, and is extremely vulnerable to addiction for adolescents. With repeated exposure to nicotine, the system undergoes neuroplastic changes that can alter gene expression, synaptic reorganization, and changes in dendritic spine (the site for learning and memory) density and length over time."
  },
  {
    id: 4,
    label: "4",
    title: "Striatum",
    region: "Dorsal & Ventral",
    x: "53%",
    y: "63%",
    content:
      "The striatum plays an essential role in the reward circuit, and has a dorsal (upper) and ventral (lower) parts. The dorsal focuses on habits while the ventral focus on motivation and dopamine. When nicotine is inhaled, it enters the blood stream, transferring a big dopamine release to the ventral striatum. Whenever you see tobacco, the ventral will reinstate its memory and reward circuits, and with continuous use of tobacco, memory of nicotine usage will go up into the dorsal striatum, making tobacco a habit."
  },
  {
    id: 5,
    label: "5",
    title: "Ventral Tegmental Area",
    region: "VTA",
    x: "57%",
    y: "75%",
    content:
      "The VTA contains dopamine-producing neurons that initiate reward signaling. As nicotine mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is released in the nucleus accumbens, which in turn hinders the reward pathway."
  }
];

// ══════════════════════════════════════════════════════════════════════
// MAIN INTERACTIVE COMPONENT
// ══════════════════════════════════════════════════════════════════════

export default function BrainInteractive() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedHotspot = HOTSPOTS.find((h) => h.id === selectedId) ?? null;

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <div
          className={[
            "relative w-full aspect-[754/639] rounded-2xl overflow-hidden",
            "bg-[#060a12] border border-white/[0.07]",
            "shadow-[0_0_90px_rgba(206,85,165,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]",
          ].join(" ")}
        >
          {/* Changed image to partsbrain.png from copy */}
          <Image
            src="/partsbrain.png"
            alt="Brain illustration"
            fill
            loading="eager"
            className="object-contain pointer-events-none"
            sizes="(max-width: 768px) 100vw, 672px"
            suppressHydrationWarning
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
            }}
            suppressHydrationWarning
            aria-hidden
          />

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
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: hs.id * 0.1 }}
              >
                {!isSelected && (
                  <span
                    className="absolute inset-0 rounded-full border border-[#ce55a5]/40 animate-ping opacity-60 pointer-events-none"
                    style={{ animationDuration: "2.5s" }}
                  />
                )}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full border border-[#ce55a5] animate-pulse opacity-30 pointer-events-none shadow-[0_0_20px_rgba(206,85,165,0.4)]" />
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedId(hs.id);
                  }}
                  className={[
                    "relative w-10 h-10 rounded-full",
                    "font-mono text-[14px] font-black tracking-wide",
                    "border-2 flex items-center justify-center",
                    "cursor-pointer select-none transition-all duration-200",
                    isSelected
                      ? "bg-[#ce55a5] border-pink-400 text-white shadow-[0_0_20px_rgba(206,85,165,0.7)] scale-110"
                      : "bg-[#070b13]/80 border-[#ce55a5] text-[#ce55a5] hover:bg-[#ce55a5] hover:text-white hover:scale-105 active:scale-95 backdrop-blur-sm",
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
                className={[
                  "flex items-center gap-2 font-mono text-[10px] tracking-wider",
                  "px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none",
                  isSelected
                    ? "bg-pink-950/40 border-[#ce55a5] text-pink-300 shadow-[0_0_15px_rgba(206,85,165,0.15)]"
                    : "bg-white/[0.01] border-white/[0.06] text-gray-500 hover:border-gray-500 hover:text-gray-300 hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <span
                  className={[
                    "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold",
                    "transition-colors duration-200",
                    isSelected
                      ? "bg-[#ce55a5] border-pink-400 text-white"
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
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedId(null)}
            />

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
                  "shadow-[0_0_50px_rgba(206,85,165,0.15),0_25px_50px_-12px_rgba(0,0,0,0.8)]",
                ].join(" ")}
              >
                <div className="h-[3px] bg-gradient-to-r from-pink-600 via-[#ce55a5] to-pink-600" />

                <div className="flex items-start justify-between px-6 pt-5 pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] text-[#ce55a5] tracking-[0.3em] uppercase mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ce55a5] shadow-[0_0_8px_rgba(206,85,165,0.8)] animate-pulse" />
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
                    className="flex-shrink-0 ml-4 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs leading-none text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  >
                    ✕
                  </button>
                </div>
                <div className="mx-6 h-px bg-white/10" />
                <p className="px-6 pt-4 pb-5 text-[13px] text-gray-300 leading-relaxed font-light">
                  {selectedHotspot.content}
                </p>
                <div className="px-6 pb-4 flex items-center justify-between border-t border-white/[0.04] pt-3">
                  <span className="font-mono text-[9px] text-gray-600 select-none tracking-wider">
                    HOTSPOT_{selectedHotspot.label}
                  </span>
                  <span className="font-mono text-[9px] text-[#ce55a5]/50 select-none tracking-wider">
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
