"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ══════════════════════════════════════════════════════════════════════
// BRAIN SCROLL REVEAL — three-stage crossfade as you scroll through
// this section:
//   1) Half-and-half brain (healthy vs. damaged tissue)
//   2) Plain baseline brain
//   3) Striatum highlighted — nicotine's primary reward-circuit target.
//
// CHANGES:
//   - Learn More panel now sits BELOW the pinned brain card, not over
//     the rest of the page. The section grows dynamically so there is
//     always enough scroll room.
//   - Hotspot positions are anchored relative to the brain *image*
//     bounding box (not the outer card), so they stay anatomically
//     correct on every screen size.
//   - Hotspot x/y values are remapped to match striatumthing.png:
//       01 Striatum center  ~(50%, 48%)
//       02 VTA              ~(46%, 63%)
//       03 Dorsal striatum  ~(44%, 32%)
//       04 Prefrontal ctx   ~(20%, 22%)
//       05 Lateral striatum ~(62%, 42%)
// ══════════════════════════════════════════════════════════════════════

interface HotspotData {
  id: number;
  label: string;
  title: string;
  region: string;
  /** Percentage relative to the brain IMAGE bounding box (not the card) */
  x: string;
  y: string;
  content: string;
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 1,
    label: "01",
    title: "Mimicking Acetylcholine",
    region: "Step 1 — Receptor Hijack",
    x: "50%",
    y: "48%",
    content:
      "Nicotine is shaped almost like acetylcholine, the brain's natural signaling molecule, " +
      "so it binds to the same nicotinic acetylcholine receptors (nAChRs). This tricks open " +
      "ion channels, letting sodium and calcium rush into neurons and making them fire more " +
      "than they normally would. Every single use re-triggers this same deception — there is " +
      "no 'safe' exposure level where this doesn't happen.",
  },
  {
    id: 2,
    label: "02",
    title: "Dopamine Surge in the VTA",
    region: "Step 2 — Reward Trigger",
    x: "46%",
    y: "63%",
    content:
      "The extra firing from step one reaches dopamine neurons in the ventral tegmental area, " +
      "triggering a burst of dopamine into the nucleus accumbens. The brain tags whatever " +
      "caused this — the cigarette, the vape, the smell of smoke — as something rewarding " +
      "worth repeating. This is the moment a habit starts being built, often within seconds " +
      "of first use.",
  },
  {
    id: 3,
    label: "03",
    title: "Wiring It Into the Striatum",
    region: "Step 3 — Habit Formation",
    x: "44%",
    y: "32%",
    content:
      "Dopamine acts on medium spiny neurons in the striatum, strengthening those connections " +
      "through long-term potentiation. Reward processing starts in the ventral striatum, but " +
      "with repeated use, the memory of nicotine creeps into the dorsal striatum — where " +
      "habits live — turning a conscious choice into an automatic craving the user no longer " +
      "fully controls.",
  },
  {
    id: 4,
    label: "04",
    title: "Quieting the Prefrontal Cortex",
    region: "Step 4 — Loss of Control",
    x: "20%",
    y: "22%",
    content:
      "With chronic use, the prefrontal cortex — the brain's center for judgment and impulse " +
      "control — becomes underactive. Its glutamate signals weaken, loosening the brake on " +
      "impulsive behavior right as craving redirects glutamate toward the reward circuit " +
      "instead. This effect is most damaging in teens, whose prefrontal cortex is still " +
      "developing and especially vulnerable to being rewired this way.",
  },
  {
    id: 5,
    label: "05",
    title: "The Addiction Loop",
    region: "Step 5 — Dependence",
    x: "62%",
    y: "42%",
    content:
      "Over time, receptors desensitize and dopamine output per dose drops, so the brain needs " +
      "more nicotine just to feel normal. Eventually it expects nicotine to function at " +
      "baseline at all — and withdrawal, not pleasure, becomes the main thing driving " +
      "continued use. What started as a single choice becomes a cycle the brain itself now " +
      "depends on to feel okay.",
  },
];

// Extra scroll height (px) added when Learn More is open so the pinned
// stage doesn't abruptly unpin while the panel is still visible.
const LEARN_MORE_EXTRA_SCROLL = 600;

export default function BrainScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  // Dimensions of the brain image rendered inside the card — used to
  // position hotspots accurately regardless of card / screen size.
  const [imgBox, setImgBox] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const selectedHotspot = HOTSPOTS.find((h) => h.id === selectedId) ?? null;

  // ── Base section height ──────────────────────────────────────────
  // 400 vh covers the three reveal stages. When Learn More is open we
  // tack on extra pixels so the pinned card stays visible while the
  // user reads the panel.
  const baseSectionVh = 400;

  // ── Scroll handler ───────────────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;

      if (rect.top > 0) {
        setPinned(false);
        setProgress(0);
      } else if (rect.bottom < vh) {
        setPinned(false);
        setProgress(1);
      } else {
        setPinned(true);
        const p = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
        setProgress(p);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [learnMoreOpen]); // re-run when learnMoreOpen changes (section height changed)

  // ── Measure brain image bounding box inside the card ────────────
  // The striatumthing.png is rendered with object-contain inside the
  // card. We use a ResizeObserver on the card to keep imgBox in sync.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // The card aspect ratio is 754:639
    const CARD_ASPECT = 754 / 639;

    // The brain image (striatumthing.png) is rendered offset and scaled
    // relative to the card via the striatumOffsetX/Y and striatumScale
    // transforms. We replicate those transforms here to compute where
    // the image actually lands on screen.
    const OFFSET_X = 20;   // px — striatumOffsetX
    const OFFSET_Y = 70;   // px — striatumOffsetY
    const SCALE = 0.65;    // striatumScale (without the tiny scroll boost)

    function measure() {
      if (!card) return;
      const cr = card.getBoundingClientRect();
      // object-contain inside card: image fills the card dimension that
      // is the tightest fit. The image itself is square-ish; use the
      // card's rendered size multiplied by the scale factor.
      const imgW = cr.width * SCALE;
      const imgH = cr.height * SCALE;
      // The transform-origin is the card's center (default).
      const cx = cr.width / 2;
      const cy = cr.height / 2;
      const imgLeft = cx - imgW / 2 + OFFSET_X;
      const imgTop = cy - imgH / 2 + OFFSET_Y;
      setImgBox({ top: imgTop, left: imgLeft, width: imgW, height: imgH });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  // ── Crossfade opacities ──────────────────────────────────────────
  const halfHalfOpacity  = clampLerp(progress, [0, 0.25, 0.4],            [1, 1, 0]);
  const baselineOpacity  = clampLerp(progress, [0.25, 0.4, 0.6, 0.75],    [0, 1, 1, 0]);
  const striatumOpacity  = clampLerp(progress, [0.6, 0.75, 1],             [0, 1, 1]);
  const hotspotsActive   = striatumOpacity > 0.6;

  const brainScale        = 1 + progress * 0.04;
  const halfHalfScale     = brainScale * 1;
  const baselineScale     = brainScale * 0.55;
  const striatumScale     = brainScale * 0.65;

  const baselineOffsetX  = 20;
  const baselineOffsetY  = 70;
  const striatumOffsetX  = 20;
  const striatumOffsetY  = 70;

  // ── Section height ───────────────────────────────────────────────
  const sectionStyle: React.CSSProperties = {
    height: learnMoreOpen
      ? `calc(${baseSectionVh}vh + ${LEARN_MORE_EXTRA_SCROLL}px)`
      : `${baseSectionVh}vh`,
  };

  return (
    <section ref={sectionRef} className="relative" style={sectionStyle}>
      {/* ── Pinned / absolute wrapper ── */}
      <div
        className={[
          "w-full",
          pinned ? "fixed top-0 left-0" : "absolute",
          !pinned && progress >= 1 ? "bottom-0" : "",
          !pinned && progress <= 0 ? "top-0" : "",
        ].join(" ")}
      >
        {/* ── Inner scroll container so Learn More pushes DOWN ── */}
        <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[5vh]">
          <div className="w-full max-w-4xl mx-4">

            {/* ── Brain card ── */}
            <div
              ref={cardRef}
              className={[
                "relative w-full aspect-[754/639] rounded-2xl overflow-hidden",
                "bg-[#060a12] border border-white/[0.07]",
                "shadow-[0_0_90px_rgba(59,130,246,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]",
              ].join(" ")}
            >
              {/* Background layer */}
              <div className="absolute inset-0">
                <Image
                  src="/preview.png"
                  alt="Brain reward circuit background"
                  fill
                  loading="eager"
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 896px"
                  suppressHydrationWarning
                />
              </div>

              {/* Stage 1: half-and-half brain */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: halfHalfOpacity,
                  transform: `scale(${halfHalfScale})`,
                }}
              >
                <Image
                  src="/preview12234.png"
                  alt="Brain split between healthy and nicotine-damaged tissue"
                  fill
                  loading="eager"
                  unoptimized
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 896px"
                  suppressHydrationWarning
                />
              </div>

              {/* Stage 2: plain baseline brain */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: baselineOpacity,
                  transform: `translate(${baselineOffsetX}px, ${baselineOffsetY}px) scale(${baselineScale})`,
                }}
              >
                <Image
                  src="/brain.png"
                  alt="Baseline sagittal brain cross-section"
                  fill
                  loading="eager"
                  unoptimized
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 896px"
                  suppressHydrationWarning
                />
              </div>

              {/* Stage 3: striatum highlighted */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: striatumOpacity,
                  transform: `translate(${striatumOffsetX}px, ${striatumOffsetY}px) scale(${striatumScale})`,
                }}
              >
                <Image
                  src="/striatumthing.png"
                  alt="Brain cross-section with the striatum highlighted"
                  fill
                  loading="eager"
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 896px"
                  suppressHydrationWarning
                />
              </div>

              {/* CRT scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
                }}
                aria-hidden
              />

              {/* Corner labels */}
              <span className="absolute top-3 left-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
                BIGGY-BRAIN
              </span>
              <span className="absolute top-3 right-3 font-mono text-[10px] text-white/20 select-none" aria-hidden>
                SCROLL_REVEAL
              </span>

              {/* Stage labels */}
              <span
                className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none"
                style={{ opacity: halfHalfOpacity }}
                aria-hidden
              >
                Healthy vs. damaged tissue
              </span>
              <span
                className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none"
                style={{ opacity: baselineOpacity }}
                aria-hidden
              >
                Baseline state
              </span>
              <span
                className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/70 tracking-[0.2em] uppercase select-none"
                style={{ opacity: hotspotsActive ? 0 : striatumOpacity }}
                aria-hidden
              >
                Striatum — reward circuit active
              </span>

              {/* ── Hotspots ──
                  Positioned relative to the brain IMAGE bounding box
                  (imgBox) rather than the card, so they sit on the
                  correct anatomy at every screen size.
              */}
              {hotspotsActive &&
                imgBox &&
                HOTSPOTS.map((hs) => {
                  const isSelected = selectedId === hs.id;
                  // Convert percentage-within-image to pixels-within-card
                  const pxX = imgBox.left + (parseFloat(hs.x) / 100) * imgBox.width;
                  const pxY = imgBox.top  + (parseFloat(hs.y) / 100) * imgBox.height;

                  return (
                    <motion.div
                      key={hs.id}
                      className="absolute z-30 flex items-center justify-center pointer-events-auto"
                      style={{
                        left: pxX,
                        top:  pxY,
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
            {/* END brain card */}

            {/* ── Tabs row ── */}
            {hotspotsActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6"
              >
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

                {/* Learn More tab */}
                <button
                  type="button"
                  onClick={() => setLearnMoreOpen((v) => !v)}
                  className={[
                    "flex items-center gap-2 font-mono text-[10px] tracking-wider",
                    "px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none",
                    learnMoreOpen
                      ? "bg-blue-950/40 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "bg-white/[0.01] border-blue-500/40 text-blue-400 hover:border-blue-400 hover:bg-blue-950/20",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold",
                      "transition-colors duration-200",
                      learnMoreOpen
                        ? "bg-blue-400 border-blue-300 text-gray-950"
                        : "border-blue-500/60 text-blue-400",
                    ].join(" ")}
                  >
                    +
                  </span>
                  Learn More
                </button>
              </motion.div>
            )}

            {/* ── Learn More panel ──
                Expands BELOW the card inside the normal document flow,
                pushing any content that follows further down the page.
                The section's extra height (LEARN_MORE_EXTRA_SCROLL) gives
                the pinned frame room to stay visible while the panel is open.
            */}
            <AnimatePresence>
              {hotspotsActive && learnMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className={[
                      "relative rounded-2xl overflow-hidden border border-blue-400/20",
                      "bg-gradient-to-br from-blue-950/60 via-blue-900/30 to-[#060a12]",
                      "shadow-[0_0_60px_rgba(59,130,246,0.15),inset_0_0_40px_rgba(0,0,0,0.3)]",
                      "p-6 md:p-8",
                    ].join(" ")}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.25), transparent 60%)",
                      }}
                      aria-hidden
                    />

                    <p className="font-mono text-[9px] text-blue-300 tracking-[0.3em] uppercase mb-3 flex items-center gap-1.5 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
                      Molecular Pathway
                    </p>
                    <h3 className="text-lg md:text-xl font-black tracking-tight text-white mb-4 relative z-10">
                      How Nicotine Hijacks the Reward Circuit
                    </h3>

                    <div className="space-y-4 relative z-10 max-w-prose">
                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 mb-1 tracking-wide">
                          1. Mimicking acetylcholine
                        </h4>
                        <p className="text-[13px] text-blue-100/70 leading-relaxed font-light">
                          Nicotine is shaped almost like acetylcholine, the brain&apos;s natural
                          signaling molecule, so it binds to the same nicotinic acetylcholine
                          receptors (nAChRs). This tricks open ion channels, letting sodium and
                          calcium rush into neurons and making them fire more than they normally
                          would.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 mb-1 tracking-wide">
                          2. Dopamine surge in the VTA
                        </h4>
                        <p className="text-[13px] text-blue-100/70 leading-relaxed font-light">
                          That extra firing reaches dopamine neurons in the ventral tegmental area,
                          triggering a burst of dopamine into the nucleus accumbens. The brain
                          tags whatever caused this — the cigarette, the vape, the smell of
                          smoke — as something rewarding worth repeating.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 mb-1 tracking-wide">
                          3. Wiring it into the striatum
                        </h4>
                        <p className="text-[13px] text-blue-100/70 leading-relaxed font-light">
                          Dopamine acts on medium spiny neurons in the striatum, strengthening
                          those connections through long-term potentiation. Reward processing
                          starts in the ventral striatum, but with repeated use, the memory of
                          nicotine creeps into the dorsal striatum — where habits live — turning
                          a choice into a craving.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 mb-1 tracking-wide">
                          4. Quieting the prefrontal cortex
                        </h4>
                        <p className="text-[13px] text-blue-100/70 leading-relaxed font-light">
                          With chronic use, the prefrontal cortex — the brain&apos;s center for
                          judgment and impulse control — becomes underactive. Its glutamate
                          signals weaken, loosening the brake on impulsive behavior right as
                          craving redirects glutamate toward the reward circuit instead.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 mb-1 tracking-wide">
                          5. The addiction loop
                        </h4>
                        <p className="text-[13px] text-blue-100/70 leading-relaxed font-light">
                          Over time, receptors desensitize, dopamine output per dose drops, and
                          the brain needs more nicotine just to feel normal. Eventually it expects
                          nicotine to function at baseline — and withdrawal, not pleasure, becomes
                          the main thing driving continued use.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-blue-400/10 relative z-10">
                      <p className="font-mono text-[8px] text-blue-300/40 tracking-wider uppercase leading-relaxed">
                        Sources: BrainFacts.org · ScienceDirect · NIH/PMC · Harvard Health
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          {/* END max-w-4xl */}
        </div>
        {/* END min-h-screen flex col */}
      </div>
      {/* END pinned wrapper */}

      {/* ── Hotspot detail modal ── */}
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
                  "shadow-[0_0_50px_rgba(6,182,212,0.15),0_25px_50px_-12px_rgba(0,0,0,0.8)]",
                ].join(" ")}
              >
                <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

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

                <div className="mx-6 h-px bg-white/10" />

                <p className="px-6 pt-4 pb-5 text-[13px] text-gray-300 leading-relaxed font-light">
                  {selectedHotspot.content}
                </p>

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
    </section>
  );
}

// ── Utility ────────────────────────────────────────────────────────
function clampLerp(t: number, stops: number[], values: number[]): number {
  if (t <= stops[0]) return values[0];
  if (t >= stops[stops.length - 1]) return values[values.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (t >= a && t <= b) {
      const localT = b === a ? 0 : (t - a) / (b - a);
      return values[i] + (values[i + 1] - values[i]) * localT;
    }
  }
  return values[values.length - 1];
}