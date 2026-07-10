"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BrainInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);

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

  const plainOpacity = stageOpacity(0);
  const partsOpacity = stageOpacity(1);
  const vtaOpacity = stageOpacity(2);
  const striatumOpacity = stageOpacity(3);
  const pfcOpacity = stageOpacity(4);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div
        className={[
          "w-full flex items-center justify-center",
          pinned ? "fixed top-0 left-0 h-screen" : "absolute",
          !pinned && progress >= 1 ? "bottom-0" : "",
          !pinned && progress <= 0 ? "top-0 h-screen" : ""
        ].join(" ")}
      >
        <div className="w-full max-w-2xl mx-auto px-4">
          <div
            className={[
              "relative w-full aspect-[754/639] rounded-2xl overflow-hidden",
              "bg-[#060a12] border border-white/[0.07]",
              "shadow-[0_0_90px_rgba(206,85,165,0.1),inset_0_0_50px_rgba(0,0,0,0.5)]",
            ].join(" ")}
          >
            {/* Stage 1: Plain brain */}
            <div className="absolute inset-0" style={{ opacity: plainOpacity }}>
              <Image
                src="/brain.png"
                alt="Plain brain"
                fill
                loading="eager"
                className="object-contain pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Stage 2: Parts brain */}
            <div className="absolute inset-0" style={{ opacity: partsOpacity }}>
              <Image
                src="/partsbrain.png"
                alt="Brain parts illustration"
                fill
                loading="eager"
                className="object-contain pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Stage 3: VTA */}
            <div className="absolute inset-0" style={{ opacity: vtaOpacity }}>
              <Image
                src="/VTA-In.png"
                alt="Ventral Tegmental Area zoom"
                fill
                loading="eager"
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Stage 4: Striatum */}
            <div className="absolute inset-0" style={{ opacity: striatumOpacity }}>
              <Image
                src="/Striatum-In.png"
                alt="Striatum zoom"
                fill
                loading="eager"
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Stage 5: PFC */}
            <div className="absolute inset-0" style={{ opacity: pfcOpacity }}>
              <Image
                src="/PFC-In.png"
                alt="Prefrontal Cortex zoom"
                fill
                loading="eager"
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)",
              }}
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
      </div>
    </section>
  );
}
