"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const REGIONS = [
  {
    id: "reward",
    title: "Brain Regions",
    src: "/partsbrain.png",
    fit: "object-contain",
    stageIndex: 1,
    short: "",
    long: "",
    learnMore: "",
  },
  {
    id: "vta",
    title: "Dopamine Overload - VTA",
    src: "/VTA-In.png",
    fit: "object-contain",
    stageIndex: 2,
    short: "Nicotine attaches to your dopaminergic neuron (DA) like a lock-and-key mechanism. The DA neuron stores dopamine, and as nicotine latches on, it opens the channels. As a result, more dopamine floods in!",
    long: "Nicotine attaches to specialized receptors on dopaminergic (DA) neurons through a lock-and-key mechanism. These receptors, called nicotinic acetylcholine receptors (nAChRs), normally respond to the neurotransmitter acetylcholine, but nicotine can activate them even more effectively. When nicotine binds to these receptors, ion channels open and dopamine floods in. It starts to produce feelings of pleasure.",
    learnMore: "The Ventral Tegmental Area contains dopamine-producing neurons that initiate reward signaling. As nicotine mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is released in the nucleus accumbens, which in turn hinders the reward pathway.",
  },
  {
    id: "striatum",
    title: "Habit Formation - Striatum",
    src: "/Striatum-In.png",
    fit: "object-contain",
    stageIndex: 3,
    short: "The excess dopamine floods your medium spiny neurons, resulting in long-term habit formation.",
    long: "Your brain memorizes: As the dopamine from your Ventral Tegmental Area (VTA) floods, assisted by your DA neurons, your medium spiny neurons (MSN) start to receive it. The constant firing results in long term potentiation (habit formation) in your striatum.",
    learnMore: "The striatum plays an essential role in the reward circuit, and has a dorsal (upper) and ventral (lower) parts. The dorsal focuses on habits while the ventral focus on motivation and dopamine. When nicotine is inhaled, it enters the blood stream, transferring a big dopamine release to the ventral striatum. Whenever you see tobacco, the ventral will reinstate its memory and reward circuits, and with continuous use of tobacco, memory of nicotine usage will go up into the dorsal striatum, making tobacco a habit.",
  },
  {
    id: "pfc",
    title: "Can't Say No - PFC",
    src: "/PFC-In.png",
    fit: "object-contain",
    stageIndex: 4,
    short: "Nicotine tricks your glutamatergic and gabaergic neurons into releasing too much glutamate, making you lose control of your impulses.",
    long: "Nicotine enters your Prefrontal Cortex, and latches onto your glutamatergic and gabaergic neurons (just like in your VTA!). Again, nicotine mimics the shape of acetylcholine. Due to this, too much glutamate is released and too little GABA is released. Instead of releasing dopamine, the excess glutamate overloads the Pyramidal neurons, causing you to lose your ability to control your impulses.",
    learnMore: "The Prefrontal Cortex is responsible for executive functions such as planning, attention, and impulse control, and is extremely vulnerable to addiction for adolescents. With repeated exposure to nicotine, the system undergoes neuroplastic changes that can alter gene expression, synaptic reorganization, and changes in dendritic spine (the site for learning and memory) density and length over time.",
  },
];

export default function BrainInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (rect.top > 0) {
        setPinned(false); setProgress(0);
      } else if (rect.bottom < vh) {
        setPinned(false); setProgress(1);
      } else {
        setPinned(true);
        setProgress(scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    function clearOnScroll() { setSelectedId(null); }
    window.addEventListener("wheel", clearOnScroll, { passive: true });
    window.addEventListener("touchmove", clearOnScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", clearOnScroll);
      window.removeEventListener("touchmove", clearOnScroll);
    };
  }, []);

  const TOTAL_STAGES = 5;

  function stageOpacity(stageIndex: number) {
    const zoneSize = 1 / TOTAL_STAGES;
    const zoneStart = stageIndex * zoneSize;
    const zoneEnd = zoneStart + zoneSize;
    const fadeWidth = zoneSize * 0.4;
    if (progress < zoneStart - fadeWidth) return 0;
    if (progress < zoneStart + fadeWidth) {
      return Math.min(Math.max((progress - (zoneStart - fadeWidth)) / (fadeWidth * 2), 0), 1);
    }
    if (progress < zoneEnd - fadeWidth) return 1;
    if (progress < zoneEnd + fadeWidth) {
      return 1 - Math.min(Math.max((progress - (zoneEnd - fadeWidth)) / (fadeWidth * 2), 0), 1);
    }
    return 0;
  }

  const stages = [
    { src: "/brain.png", alt: "Plain brain", fit: "object-contain" },
    { src: "/partsbrain.png", alt: "Brain parts illustration", fit: "object-contain" },
    { src: "/VTA-In.png", alt: "Ventral Tegmental Area zoom", fit: "object-contain" },
    { src: "/Striatum-In.png", alt: "Striatum zoom", fit: "object-contain" },
    { src: "/PFC-In.png", alt: "Prefrontal Cortex zoom", fit: "object-contain" },
  ];

  const selectedRegion = REGIONS.find((r) => r.id === selectedId) ?? null;

  let currentStageIndex = 0;
  let maxOp = 0;
  stages.forEach((_, i) => {
    const op = stageOpacity(i);
    if (op > maxOp) {
      maxOp = op;
      currentStageIndex = i;
    }
  });

  const activeRegion = selectedRegion ?? REGIONS.find((r) => r.stageIndex === currentStageIndex) ?? null;
  const showLearnMore = activeRegion && activeRegion.id !== "reward";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="text-center pt-12 px-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-[#ce55a5]">
          Interactive Brain Map
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Explore the brain regions linked to nicotine addiction
        </h1>
        <p className="mt-3 text-sm text-white/50">Scroll to zoom through each region, or click a button</p>
      </div>

      <section ref={sectionRef} className="relative h-[500vh]">
        <div
          className={[
            "w-full flex items-center justify-center",
            pinned ? "fixed top-0 left-0 h-screen" : "absolute",
            !pinned && progress >= 1 ? "bottom-0" : "",
            !pinned && progress <= 0 ? "top-0 h-screen" : ""
          ].join(" ")}
        >
          <div className="w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-6 justify-center">
            {/* Main brain image */}
            <div className="w-full max-w-2xl">
              <div className="relative w-full aspect-[754/639] rounded-2xl overflow-hidden bg-[#060a12] border border-white/[0.07] shadow-[0_0_90px_rgba(206,85,165,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]">
                {!selectedRegion && stages.map((stage, i) => (
                  <div key={stage.src} className="absolute inset-0" style={{ opacity: stageOpacity(i) }}>
                    <Image
                      src={stage.src}
                      alt={stage.alt}
                      fill
                      loading="eager"
                      className={`${stage.fit} pointer-events-none`}
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                ))}

                {selectedRegion && (
                  <div className="absolute inset-0">
                    <Image
                      src={selectedRegion.src}
                      alt={selectedRegion.title}
                      fill
                      loading="eager"
                      className={`${selectedRegion.fit} pointer-events-none`}
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                )}

                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
                  }}
                  aria-hidden
                />

                {showLearnMore && (
                  <button
                    onClick={() => setLearnMoreOpen(true)}
                    className="absolute bottom-6 left-6 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 z-20"
                  >
                    Learn More
                  </button>
                )}

                <span className="absolute top-3 left-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
                  BIGGY·BRAIN
                </span>
                <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
                  INTERACTIVE
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full max-w-sm space-y-3">
              {REGIONS.map((region) => {
                const isActive = activeRegion?.id === region.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedId(region.id)}
                    className={[
                      "w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                      isActive
                        ? "border-[#ce55a5] bg-white text-black"
                        : "border-white/10 bg-black/60 backdrop-blur-md text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="text-base font-semibold">{region.title}</div>
                    <div
                      className={`grid transition-all duration-400 ${
                        isActive && region.short ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold leading-6 text-black">{region.short}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {learnMoreOpen && activeRegion && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-[28px] border border-white/15 bg-black/90 p-8 text-white shadow-2xl">
            <div className="mb-4 flex justify-between items-start">
              <h3 className="text-2xl font-bold">{activeRegion.title}</h3>
              <button
                onClick={() => setLearnMoreOpen(false)}
                className="text-sm text-white/70 hover:text-white ml-4"
              >
                Close
              </button>
            </div>
            <p className="text-white/80 leading-8">{activeRegion.long}</p>
          </div>
        </div>
      )}
    </main>
  );
}
