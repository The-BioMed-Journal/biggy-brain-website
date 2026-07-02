import type { Metadata } from "next";
import BrainInteractive from "../brain-interactive";

export const metadata: Metadata = {
  title: "Zoomed In",
};

export default function BrainPage() {
  return (
    <main className="bg-black min-h-screen pt-10 pb-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-white uppercase tracking-tight">
            Interactive Neural Mapping
          </h1>
          <p className="text-gray-400 font-sans font-normal max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Scroll down through the section window to advance the internal structures of the brain and interact with active dopamine reward hotspots.
          </p>
        </div>

        {/* Dedicated Interactive Component Wrapper */}
        <BrainInteractive />
      </div>
    </main>
  );
}
