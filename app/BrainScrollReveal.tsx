"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HotspotData {
  id: number;
  label: string;
  title: string;
  region: string;
  x: string;
  y: string;
  content: string;
}

const BASELINE_HOTSPOTS: HotspotData[] = [
  { id: 1, label: "01", title: "Brain Reward System", region: "Overall Brain Architecture", x: "50%", y: "48%", content: "The brain's reward and cognitive control systems involve several interconnected structures, primarily the Ventral Tegmental Area (VTA), nucleus accumbens, striatum, and prefrontal cortex (PFC), all of which work together to regulate reward, motivation, decision-making, and habit formation." },
  { id: 2, label: "02", title: "Midbrain Reward Circuit", region: "VTA & Nucleus Accumbens", x: "46%", y: "63%", content: "The VTA contains dopamine-producing neurons that initiate reward signaling, while the nucleus accumbens and striatum process reinforcement and reward signaling. This shifts behavior toward habit-based responses with repeated stimulation. As nicotine mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is released in the nucleus accumbens, which in turn activates the reward pathway." },
  { id: 3, label: "03", title: "Prefrontal Cortex", region: "Frontal Lobe — Executive Control", x: "28%", y: "30%", content: "The PFC is responsible for executive functions such as planning, attention, and impulse control, and is one of the last brain regions to mature, resulting in extreme vulnerability to addiction during adolescence. These regions are connected through dopamine and acetylcholine signaling pathways that regulate learning and reinforcement. With repeated exposure to strong stimuli such as nicotine, the system undergoes neuroplastic changes that can alter gene expression, synaptic reorganization, and changes in dendritic spine density and length over time." },
];

const HOTSPOTS: HotspotData[] = [
  { id: 1, label: "01", title: "Mimicking Acetylcholine", region: "Step 1 — Receptor Hijack", x: "50%", y: "48%", content: "Nicotine is shaped almost like acetylcholine, the brain's natural signaling molecule, so it binds to the same nicotinic acetylcholine receptors (nAChRs). This tricks open ion channels, letting sodium and calcium rush into neurons and making them fire more than they normally would. Every single use re-triggers this same deception — there is no 'safe' exposure level where this doesn't happen." },
  { id: 2, label: "02", title: "Dopamine Surge in the VTA", region: "Step 2 — Reward Trigger", x: "46%", y: "63%", content: "The extra firing from step one reaches dopamine neurons in the ventral tegmental area, triggering a burst of dopamine into the nucleus accumbens. The brain tags whatever caused this — the cigarette, the vape, the smell of smoke — as something rewarding worth repeating. This is the moment a habit starts being built, often within seconds of first use." },
  { id: 3, label: "03", title: "Wiring It Into the Striatum", region: "Step 3 — Habit Formation", x: "44%", y: "32%", content: "Dopamine acts on medium spiny neurons in the striatum, strengthening those connections through long-term potentiation. Reward processing starts in the ventral striatum, but with repeated use, the memory of nicotine creeps into the dorsal striatum — where habits live — turning a conscious choice into an automatic craving." },
  { id: 4, label: "04", title: "Quieting the Prefrontal Cortex", region: "Step 4 — Loss of Control", x: "20%", y: "22%", content: "With chronic use, the prefrontal cortex — the brain's center for judgment and impulse control — becomes underactive. Its glutamate signals weaken, loosening the brake on impulsive behavior. This effect is most damaging in teens, whose prefrontal cortex is still developing and especially vulnerable to being rewired." },
  { id: 5, label: "05", title: "The Addiction Loop", region: "Step 5 — Dependence", x: "62%", y: "42%", content: "Over time, receptors desensitize and dopamine output per dose drops, so the brain needs more nicotine just to feel normal. Eventually withdrawal, not pleasure, becomes the main thing driving continued use. What started as a single choice becomes a cycle the brain depends on." },
];

const LEARN_MORE_EXTRA_SCROLL = 600;

function Hotspot({ hs, pxX, pxY }: { hs: HotspotData; pxX: number; pxY: number }) {
  const [show, setShow] = useState(false);
  const [tipPos, setTipPos] = useState({ top: 0, left: 0 });
  const dotRef = useRef<HTMLDivElement>(null);

  const open = () => {
    if (dotRef.current) {
      const r = dotRef.current.getBoundingClientRect();
      setTipPos({ top: r.top + r.height / 2, left: r.right + 12 });
    }
    setShow(true);
  };

  return (
    <>
      <div
        ref={dotRef}
        className="absolute z-30"
        style={{ left: pxX, top: pxY, transform: "translate(-50%,-50%)", width: 40, height: 40 }}
        onMouseEnter={open}
        onMouseLeave={() => setShow(false)}
      >
        {!show && <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-60" style={{ animationDuration: "2.5s" }} />}
        {show && <span className="absolute -inset-2 rounded-full border border-cyan-400 animate-pulse opacity-30 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />}
        <div className={["w-10 h-10 rounded-full font-mono text-[10px] font-black border-2 flex items-center justify-center transition-all duration-200 cursor-pointer",
          show ? "bg-cyan-400 border-cyan-300 text-gray-950 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.7)]" : "bg-[#070b13]/80 border-cyan-400 text-cyan-400"].join(" ")}>
          {hs.label}
        </div>
      </div>

      {show && typeof window !== "undefined" && (
        <div style={{ position: "fixed", top: tipPos.top, left: tipPos.left, transform: "translateY(-50%)", width: 280, zIndex: 999999, pointerEvents: "none" }}>
          <div style={{ background: "rgba(2,6,23,0.97)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, overflow: "hidden", boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}>
            <div style={{ height: 2, background: "linear-gradient(to right,#2563eb,#22d3ee,#2563eb)" }} />
            <div style={{ padding: "12px 16px 8px" }}>
              <p style={{ fontFamily: "monospace", fontSize: 8, color: "#22d3ee", letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 4px" }}>{hs.region}</p>
              <h3 style={{ fontSize: 14, fontWeight: 900, color: "#fff", lineHeight: 1.3, margin: 0 }}>{hs.title}</h3>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 16px" }} />
            <p style={{ padding: "8px 16px 12px", fontSize: 11, color: "#d1d5db", lineHeight: 1.6, margin: 0 }}>{hs.content}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function BrainScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [imgBox, setImgBox] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const baseSectionVh = 400;

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (rect.top > 0) { setPinned(false); setProgress(0); }
      else if (rect.bottom < vh) { setPinned(false); setProgress(1); }
      else { setPinned(true); setProgress(scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [learnMoreOpen]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const OFFSET_X = 20, OFFSET_Y = 70, SCALE = 0.65;
    function measure() {
      if (!card) return;
      const cr = card.getBoundingClientRect();
      const imgW = cr.width * SCALE, imgH = cr.height * SCALE;
      const cx = cr.width / 2, cy = cr.height / 2;
      setImgBox({ top: cy - imgH / 2 + OFFSET_Y, left: cx - imgW / 2 + OFFSET_X, width: imgW, height: imgH });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  const halfHalfOpacity = clampLerp(progress, [0, 0.25, 0.4], [1, 1, 0]);
  const baselineOpacity = clampLerp(progress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const striatumOpacity = clampLerp(progress, [0.6, 0.75, 1], [0, 1, 1]);
  const hotspotsActive = baselineOpacity > 0.3 || striatumOpacity > 0.3;
  const brainScale = 1 + progress * 0.04;

  const sectionStyle: React.CSSProperties = {
    height: learnMoreOpen ? `calc(${baseSectionVh}vh + ${LEARN_MORE_EXTRA_SCROLL}px)` : `${baseSectionVh}vh`,
  };

  return (
    <section ref={sectionRef} className="relative" style={sectionStyle}>
      <div className={["w-full", pinned ? "fixed top-0 left-0" : "absolute", !pinned && progress >= 1 ? "bottom-0" : "", !pinned && progress <= 0 ? "top-0" : ""].join(" ")}>
        <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[5vh]">
          <div className="w-full max-w-7xl mx-auto px-4">

            <div ref={cardRef} className="relative w-full aspect-[754/639] rounded-2xl overflow-hidden bg-[#060a12] border border-white/[0.07] shadow-[0_0_90px_rgba(59,130,246,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0"><Image src="/preview.png" alt="" fill loading="eager" className="object-contain pointer-events-none" sizes="(max-width:768px) 100vw,896px" suppressHydrationWarning /></div>
              <div className="absolute inset-0" style={{ opacity: halfHalfOpacity, transform: `scale(${brainScale})` }}><Image src="/preview12234.png" alt="" fill loading="eager" unoptimized className="object-contain pointer-events-none" sizes="(max-width:768px) 100vw,896px" suppressHydrationWarning /></div>
              <div className="absolute inset-0" style={{ opacity: baselineOpacity, transform: `translate(20px,70px) scale(${brainScale * 0.55})` }}><Image src="/brain.png" alt="" fill loading="eager" unoptimized className="object-contain pointer-events-none" sizes="(max-width:768px) 100vw,896px" suppressHydrationWarning /></div>
              <div className="absolute inset-0" style={{ opacity: striatumOpacity, transform: `translate(20px,70px) scale(${brainScale * 0.65})` }}><Image src="/striatumthing.png" alt="" fill loading="eager" className="object-contain pointer-events-none" sizes="(max-width:768px) 100vw,896px" suppressHydrationWarning /></div>
              <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)" }} aria-hidden />
              <span className="absolute top-3 left-3 font-mono text-[10px] text-white/20 select-none">BIGGY-BRAIN</span>
              <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none">SCROLL_REVEAL</span>
              <span className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none" style={{ opacity: halfHalfOpacity }}>Healthy vs. damaged tissue</span>
              <span className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none" style={{ opacity: baselineOpacity }}>Baseline state</span>
              <span className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none" style={{ opacity: hotspotsActive ? 0 : striatumOpacity }}>Striatum — reward circuit active</span>

              {hotspotsActive && imgBox && (striatumOpacity > 0.3 ? HOTSPOTS : BASELINE_HOTSPOTS).map((hs) => (
                <Hotspot
                  key={hs.id}
                  hs={hs}
                  pxX={imgBox.left + (parseFloat(hs.x) / 100) * imgBox.width}
                  pxY={imgBox.top + (parseFloat(hs.y) / 100) * imgBox.height}
                />
              ))}
            </div>

            {hotspotsActive && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-wrap justify-center gap-3 mt-6">
                {(striatumOpacity > 0.3 ? HOTSPOTS : BASELINE_HOTSPOTS).map((hs) => (
                  <div key={hs.id} className="flex items-center gap-2 font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-full border border-white/[0.06] text-gray-500 bg-white/[0.01]">
                    <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[9px] font-bold">{hs.label}</span>
                    {hs.title}
                  </div>
                ))}
                <button type="button" onClick={() => setLearnMoreOpen((v) => !v)}
                  className={["flex items-center gap-2 font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer",
                    learnMoreOpen ? "bg-blue-950/40 border-blue-400 text-blue-300" : "bg-white/[0.01] border-blue-500/40 text-blue-400 hover:border-blue-400"].join(" ")}>
                  <span className={["w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold", learnMoreOpen ? "bg-blue-400 border-blue-300 text-gray-950" : "border-blue-500/60 text-blue-400"].join(" ")}>+</span>
                  Learn More
                </button>
              </motion.div>
            )}

            <AnimatePresence>
              {hotspotsActive && learnMoreOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden mt-5">
                  <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-950/60 via-blue-900/30 to-[#060a12] p-6 md:p-8">
                    <h3 className="text-lg font-black text-white mb-4">How Nicotine Hijacks the Reward Circuit</h3>
                    <div className="space-y-4">
                      {[
                        { t: "1. Mimicking acetylcholine", b: "Nicotine binds to nicotinic acetylcholine receptors, tricking open ion channels and making neurons fire more than they normally would." },
                        { t: "2. Dopamine surge in the VTA", b: "Extra firing triggers a dopamine burst into the nucleus accumbens, tagging nicotine as something rewarding worth repeating." },
                        { t: "3. Wiring it into the striatum", b: "With repeated use, nicotine memory moves from the ventral to the dorsal striatum — turning a choice into an automatic craving." },
                        { t: "4. Quieting the prefrontal cortex", b: "Chronic use weakens PFC glutamate signals, loosening impulse control while cravings redirect that glutamate toward the reward circuit." },
                        { t: "5. The addiction loop", b: "Receptors desensitize, dopamine output drops, and withdrawal — not pleasure — becomes the main driver of continued use." },
                      ].map(({ t, b }) => (
                        <div key={t}>
                          <h4 className="text-[12px] font-bold text-cyan-300 mb-1">{t}</h4>
                          <p className="text-[13px] text-blue-100/70 leading-relaxed">{b}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}

function clampLerp(t: number, stops: number[], values: number[]): number {
  if (t <= stops[0]) return values[0];
  if (t >= stops[stops.length - 1]) return values[values.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    if (t >= a && t <= b) return values[i] + (values[i + 1] - values[i]) * ((t - a) / (b - a));
  }
  return values[values.length - 1];
}
