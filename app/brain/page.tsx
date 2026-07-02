"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BrainInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const scrollable = rect.height - vh;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const raw = -rect.top / scrollable;
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // smooth transitions
  const plainOpacity = Math.max(1 - progress * 1.5, 0);
  const partsOpacity = Math.min(progress * 1.5, 1);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      {/* ALWAYS FIXED CENTER VIEWPORT */}
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="relative w-full max-w-2xl px-4">
          <div className="relative aspect-[754/639] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#060a12] shadow-[0_0_90px_rgba(0,0,0,0.6)]">

            {/* Plain brain */}
            <div className="absolute inset-0 transition-opacity" style={{ opacity: plainOpacity }}>
              <Image
                src="/brain.png"
                alt="Plain brain"
                fill
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Parts brain */}
            <div className="absolute inset-0 transition-opacity" style={{ opacity: partsOpacity }}>
              <Image
                src="/partsbrain.png"
                alt="Parts brain"
                fill
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* subtle overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)",
              }}
            />

            {/* label */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30">
              BRAIN · SCROLL
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-white/30">
              CENTER LOCKED
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}