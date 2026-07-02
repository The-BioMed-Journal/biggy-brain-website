"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BrainScrollReveal() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;

      if (rect.top >= 0) {
        setPinned(false);
        setProgress(0);
      } else if (rect.bottom <= vh) {
        setPinned(true);
        setProgress(1);
      } else {
        setPinned(true);
        setProgress(
          scrollable > 0
            ? Math.min(Math.max(-rect.top / scrollable, 0), 1)
            : 0
        );
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

  const loopOpacity = Math.min(Math.max(progress * 2, 0), 1);
  const blackBrainOpacity = Math.min(Math.max((progress - 0.5) * 2, 0), 1);
  const showSidebar = progress >= 0.95;

  useEffect(() => {
    if (!hasInteracted) {
      setPreviewVisible(false);
      return;
    }

    setPreviewVisible(false);
    const timer = window.setTimeout(() => setPreviewVisible(true), 60);
    return () => window.clearTimeout(timer);
  }, [selectedRegion, hasInteracted]);

  const regions = [
    {
      id: "overview",
      label: "Overview",
      placeholder: "/blackbrain.png",
      description:
        "Different areas of your brain control what decisions you make—such as whether to brush your teeth or not.",
      learnMoreText: [
        " The brain’s reward and cognitive control systems involve several interconnected structures, primarily the Ventral Tegmental Area (VTA), nucleus accumbens, striatum, and prefrontal cortex (PFC), all of which work together to regulate reward, motivation, decision-making, and habit formation. "
      ],
    },
    {
      id: "pfc",
      label: "Prefrontal Cortex",
      placeholder: "/pfc.png",
      description:
        "Focus in class. Control your bad habits. Plan ahead. Without your prefrontal cortex, you can’t do any of those.",
      learnMoreText: [
        "The Prefrontal Cortex is responsible for executive functions such as planning, attention, and impulse control, and is extremely vulnerable to addiction for adolescents. With repeated exposure to nicotine, the system undergoes neuroplastic changes that can alter gene expression, synaptic reorganization, and changes in dendritic spine (the site for learning and memory) density and length over time."
      ],
    },
    {
      id: "striatum",
      label: "Striatum",
      placeholder: "/striatum.png",
      description:
        "The striatum rewards you for every bad habit. When you simply look at nicotine, your striatum will tell you to crave it.",
      learnMoreText: [
        "The striatum plays an essential role in the reward circuit, and has a dorsal (upper) and ventral (lower) parts. The dorsal focuses on habits while the ventral focus on motivation and dopamine. When nicotine is inhaled, it enters the blood stream, transferring a big dopamine release to the ventral striatum. Whenever you see tobacco, the ventral will reinstate its memory and reward circuits, and with continuous use of tobacco, memory of nicotine usage will go up into the dorsal striatum, making tobacco a habit."
      ],
    },
    {
      id: "vta",
      label: "Ventral Tegmental Area",
      placeholder: "/vta.png",
      description:
        "Nicotine tricks the VTA into releasing excess dopamine.",
      learnMoreText: [
        "The Ventral Tegmental Area contains dopamine-producing neurons that initiate reward signaling. As nicotine mimics acetylcholine, it opens ion channels in the VTA. As a result, dopamine is released in the nucleus accumbens, which in turn hinders the reward pathway."
      ],
    },
    {
      id: "redirect",
      label: "Zoom In",
      placeholder: "/redirect.png",
      description: "",
      learnMoreText: [],
    },
  ];

  const selectedRegionData = regions.find(
    (r) => r.id === selectedRegion
  );

  const shouldShowPreview =
    showSidebar &&
    hasInteracted &&
    previewVisible &&
    Boolean(selectedRegionData);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div
        className={[
          "w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black",
          pinned ? "fixed top-0 left-0" : "absolute",
        ].join(" ")}
      >
        <div className="relative flex h-[90vh] w-[90vw] items-center justify-center">

          {/* Brick Brain */}
          <div className="absolute inset-0">
            <Image
              src="/brickbrain.png"
              alt="Brick wall and brain"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loop Brain */}
          <div
            className="absolute inset-0 transition-opacity"
            style={{ opacity: loopOpacity }}
          >
            <Image
              src="/loopbrain.png"
              alt="Loop diagram"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Final Brain */}
          <div
            className="absolute inset-0 transition-opacity"
            style={{ opacity: blackBrainOpacity }}
          >
            <Image
              src="/blackbrain.png"
              alt="Normal brain"
              fill
              className="object-contain scale-110"
              priority
            />

            {/* Preview */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                shouldShowPreview
                  ? "pointer-events-auto opacity-100 scale-100"
                  : "pointer-events-none opacity-0 scale-[0.98]"
              }`}
            >
              {selectedRegionData ? (
                <div className="relative h-full w-full">
                  <Image
                    src={selectedRegionData.placeholder}
                    alt={selectedRegionData.label}
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute bottom-6 left-6">
                    <button
                      onClick={() => setLearnMoreOpen(true)}
                      className="rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Popup */}
            {learnMoreOpen && selectedRegionData && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out">
                <div className="mx-6 w-full max-w-2xl rounded-[28px] border border-white/15 bg-black/80 p-8 text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]">

                  <div className="mb-4 flex justify-between">
                    <h3 className="text-2xl font-bold">
                      {selectedRegionData.label}
                    </h3>

                    <button
                      onClick={() => setLearnMoreOpen(false)}
                      className="text-sm text-white/70 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-4 text-white/80 leading-8">
                    {selectedRegionData.learnMoreText.length > 0 ? (
                      selectedRegionData.learnMoreText.map((paragraph, index) => (
                        <p key={`${selectedRegionData.id}-paragraph-${index}`}>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p>{selectedRegionData.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div
              className={`absolute right-10 top-1/2 w-[380px] -translate-y-1/2 transition-all duration-500 ${
                showSidebar
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-8 opacity-0"
              }`}
            >
              {regions.map((region) => {
                const active = selectedRegion === region.id;

                return (
                  <div
                    key={region.id}
                    className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/20 bg-black/60 backdrop-blur-md"
                    }`}
                  >
                    <button
                      onClick={() => {
                        if (region.id === "redirect") {
                          router.push("/brain");
                          return;
                        }

                        setSelectedRegion(region.id);
                        setHasInteracted(true);
                      }}
                      className={`w-full px-8 py-6 text-left transition ${
                        active ? "text-black" : "text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="text-2xl font-semibold">
                        {region.label}
                      </div>

                      <div
                        className={`grid transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                          active
                            ? "mt-2 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="text-base leading-7 text-black/70">
                            {region.description}
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
      </div>
    </section>
  );
}