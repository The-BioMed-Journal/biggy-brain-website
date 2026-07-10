"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface HotspotData {
  id: number;
  label: string;
  title: string;
  region: string;
  x: string;
  y: string;
  content: string;
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 1,
    label: "1",
    title: "Reward & Cognitive Control",
    region: "Overall Architecture",
    x: "55%",
    y: "45%",
    content:
      "The brain’s reward and cognitive control systems involve several interconnected structures, primarily the Ventral Tegmental Area (VTA), nucleus accumbens, striatum, and prefrontal cortex (PFC), all of which work together to regulate reward, motivation, decision-making, and habit formation.",
  },
  {
    id: 3,
    label: "3",
    title: "Prefrontal Cortex",
    region: "PFC",
    x: "40%",
    y: "50%",
    content:
      "The PFC is responsible for executive functions such as planning, attention, and impulse control, and is extremely vulnerable to addiction for adolescents. With repeated exposure to nicotine, the system undergoes neuroplastic changes that can alter gene expression, synaptic reorganization, and changes in dendritic spine density and length over time.",
  },
  {
    id: 4,
    label: "4",
    title: "Striatum",
    region: "Dorsal & Ventral",
    x: "53%",
    y: "63%",
    content:
      "The striatum plays an essential role in the reward circuit, and has a dorsal and ventral part. The dorsal focuses on habits while the ventral focuses on motivation and dopamine. When nicotine is inhaled, it enters the bloodstream and triggers a large dopamine release in the ventral striatum. Over time, this can strengthen nicotine-related habits in the dorsal striatum.",
  },
  {
    id: 5,
    label: "5",
    title: "Ventral Tegmental Area",
    region: "VTA",
    x: "57%",
    y: "75%",
    content:
      "The VTA contains dopamine-producing neurons that initiate reward signaling. As nicotine mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is released in the nucleus accumbens, which in turn alters the reward pathway.",
  },
];

export default function BrainInteractive() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const selectedHotspot = HOTSPOTS.find((h) => h.id === activeModalId) ?? null;

  const selectedImage = selectedId
    ? selectedId === 3
      ? "/pfc.png"
      : selectedId === 4
        ? "/striatum.png"
        : selectedId === 5
          ? "/vta.png"
          : "/blackbrain.png"
    : "/partsbrain.png";

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div className="text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-[#ce55a5]">
            Interactive Brain Map
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore the brain regions linked to nicotine addiction
          </h1>
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative aspect-[754/639] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#060a12] shadow-[0_0_90px_rgba(206,85,165,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedImage}
                  alt="Brain illustration"
                  fill
                  loading="eager"
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 672px"
                  suppressHydrationWarning
                />
              </motion.div>

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
            </div>
          </div>

          <div className="w-full max-w-sm space-y-3 lg:mt-2">
            {HOTSPOTS.map((hs) => {
              const isSelected = selectedId === hs.id;

              return (
                <div
                  key={hs.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                    isSelected
                      ? "border-[#ce55a5] bg-white text-black"
                      : "border-white/10 bg-black/60 backdrop-blur-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(hs.id);
                      setActiveModalId(hs.id);
                    }}
                    className={`w-full px-5 py-4 text-left transition ${
                      isSelected ? "text-black" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="text-base font-semibold">{hs.title}</div>

                    <div
                      className={`grid transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                        isSelected
                          ? "mt-2 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`text-sm leading-6 ${isSelected ? "text-black/70" : "text-white/70"}`}>
                          {hs.region}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedHotspot && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ pointerEvents: "auto" }}>
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveModalId(null)}
            />

            <motion.div
              className="relative z-10 mb-2 w-full max-w-[460px] self-end md:mb-0 md:self-auto"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 shadow-[0_0_50px_rgba(206,85,165,0.15),0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="h-[3px] bg-gradient-to-r from-pink-600 via-[#ce55a5] to-pink-600" />

                <div className="flex items-start justify-between px-6 pt-5 pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#ce55a5]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ce55a5] shadow-[0_0_8px_rgba(206,85,165,0.8)] animate-pulse" />
                      {selectedHotspot.region}
                    </p>
                    <h2 className="text-[1.25rem] font-black leading-snug tracking-tight text-white">
                      {selectedHotspot.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModalId(null)}
                    aria-label="Close"
                    className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-xs leading-none text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="mx-6 h-px bg-white/10" />
                <p className="px-6 pt-4 pb-5 text-[13px] font-light leading-relaxed text-gray-300">
                  {selectedHotspot.content}
                </p>
                <div className="flex items-center justify-between border-t border-white/[0.04] px-6 pb-4 pt-3">
                  <span className="select-none font-mono text-[9px] tracking-wider text-gray-600">
                    HOTSPOT_{selectedHotspot.label}
                  </span>
                  <span className="select-none font-mono text-[9px] tracking-wider text-[#ce55a5]/50">
                    CLICK OUTSIDE TO CLOSE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}