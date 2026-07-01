"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BrainScrollReveal() {
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

  // Map scroll progress to opacities
  // 0.0 -> 0.5: Blackbrain fades in over Brickbrain
  // 0.7 -> 1.0: Loop Diagram fades in
  const blackBrainOpacity = Math.min(Math.max(progress * 2, 0), 1);
  const loopOpacity = Math.min(Math.max((progress - 0.7) / 0.3, 0), 1);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div
        className={[
          "w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black",
          pinned ? "fixed top-0 left-0" : "absolute",
          !pinned && progress >= 1 ? "bottom-0" : "",
          !pinned && progress <= 0 ? "top-0" : ""
        ].join(" ")}
      >
        <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video flex items-center justify-center">

          {/* Base Brickbrain Layer */}
          <div className="absolute inset-0">
            <Image
              src="/brickbrain.png"
              alt="Brick wall and brain"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Overlay Blackbrain Layer */}
          <div className="absolute inset-0 transition-opacity" style={{ opacity: blackBrainOpacity }}>
            <Image
              src="/blackbrain.png"
              alt="Black brain"
              fill
              className="object-contain scale-110"
              priority
            />
          </div>

          {/* Loop Diagram */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity"
            style={{ opacity: loopOpacity }}
          >
            <div className="relative w-full h-full max-w-[800px] max-h-[800px] mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">

              <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" aria-hidden="true">
                <defs>
                  <marker id="arrowhead" markerWidth="14" markerHeight="14" refX="8" refY="7" orient="auto">
                    <path d="M0,0 L14,7 L0,14 Z" fill="#ce55a5" />
                  </marker>
                </defs>
                {/* SVG Paths mapped to the original index.html diagram coordinates */}
                <path d="M 500,375 Q 850,375 950,500" fill="none" stroke="#ce55a5" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <path d="M 950,500 Q 800,800 500,850" fill="none" stroke="#ce55a5" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <path d="M 500,850 Q 150,800 50,500" fill="none" stroke="#ce55a5" strokeWidth="4" markerEnd="url(#arrowhead)" />
                <path d="M 50,500 Q 150,375 500,375" fill="none" stroke="#ce55a5" strokeWidth="4" markerEnd="url(#arrowhead)" />
              </svg>

              {/* Loop Steps overlay (Percentages adapted from HTML layout for responsive React mapping) */}
              <div className="absolute text-center flex flex-col items-center w-[130px] top-[15%] left-1/2 -translate-x-1/2">
                <span className="text-[1.8rem] text-[#ce55a5] font-bold">1</span>
                <span className="text-white text-base mt-1">You Use</span>
              </div>

              <div className="absolute text-center flex flex-col items-center w-[130px] top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2">
                <span className="text-[1.8rem] text-[#ce55a5] font-bold">2</span>
                <span className="text-white text-base mt-1">Dopamine Release</span>
              </div>

              <div className="absolute text-center flex flex-col items-center w-[130px] top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-[1.8rem] text-[#ce55a5] font-bold">3</span>
                <span className="text-white text-base mt-1">You Learn</span>
              </div>

              <div className="absolute text-center flex flex-col items-center w-[130px] top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2">
                <span className="text-[1.8rem] text-[#ce55a5] font-bold">4</span>
                <span className="text-white text-base mt-1">You Crave</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
