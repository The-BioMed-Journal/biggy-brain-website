import Image from "next/image";
import BrainInteractive from "./brain-interactive";
import BrainScrollReveal from "./BrainScrollReveal";

const STATS = [
  { stat: "3×", label: "Higher addiction risk in teens vs. adults" },
  { stat: "90%", label: "Of adult smokers started before age 18" },
  { stat: "↓PFC", label: "Prefrontal maturation disrupted by early nicotine exposure" },
];

const SOURCES = [
  { href: "https://nida.nih.gov/publications/drugfacts/tobacco-nicotine-e-cigarettes", title: "NIDA — Tobacco, Nicotine & E-Cigarettes", desc: "National Institute on Drug Abuse overview of nicotine pharmacology and dependence." },
  { href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3250973/", title: "NIH — Adolescent Brain Development & Vulnerability to Addiction", desc: "Neurological analysis detailing why the developing prefrontal cortex is highly sensitive." },
  { href: "https://pubmed.ncbi.nlm.nih.gov/", title: "PubMed — Biomedical Literature Database", desc: "Search engine for peer-reviewed life science and biomedical research studies." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07080f] text-white overflow-x-hidden selection:bg-[#ce55a5]/25">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/55 backdrop-blur-md border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between w-full">
          <a href="/" className="font-mono font-black text-sm tracking-widest leading-none uppercase transition-colors hover:text-[#ce55a5]">
            BIGGY<span className="text-[#ce55a5]">BRAIN</span>
          </a>
          <ul className="flex gap-6 font-mono text-[10px] text-gray-400" role="list">
            {(["Brain", "Research", "About"] as const).map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-[#ce55a5] transition-colors tracking-widest uppercase relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-[#ce55a5] hover:after:w-full after:transition-all after:duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ════════════════ BRAIN SCROLL REVEAL ════════════════ */}
      <BrainScrollReveal />

      {/* ════════════════ HERO ════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-[85vh] pt-36 pb-24 px-5"
        aria-label="Hero"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" suppressHydrationWarning aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #ce55a5, #831843)" }} suppressHydrationWarning />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] text-[#ce55a5] tracking-[0.3em] uppercase border border-[#ce55a5]/30 rounded-full px-4.5 py-1.5 bg-pink-950/40 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(206,85,165,0.1)] relative overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ce55a5] animate-pulse" />
            Biomed Research Initiative
          </span>

          <p className="text-gray-400 text-sm md:text-base max-w-[48ch] mx-auto leading-relaxed mb-10 font-light">
            Nicotine rewires the adolescent brain at a cellular level. Explore the neural pathways, uncover vulnerabilities, and see what the scientific research reveals.
          </p>

          <a href="#brain" className="inline-flex items-center gap-2 bg-[#ce55a5] text-white font-black text-sm px-8 py-3.5 rounded-full uppercase tracking-wide hover:bg-pink-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_28px_rgba(206,85,165,0.38)] hover:shadow-[0_0_44px_rgba(206,85,165,0.55)]">
            Explore the Brain <span aria-hidden>→</span>
          </a>

          <div className="mt-16 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase">Scroll to explore</span>
            <svg className="w-4 h-4 text-[#ce55a5]/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" suppressHydrationWarning>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* BRAIN SECTION */}
      <section id="brain" className="relative px-6 py-20 md:py-28 scroll-mt-24 border-t border-white/[0.03]" aria-label="Interactive brain visualization">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase mb-3">
              Nicotine &amp; <span className="text-[#ce55a5] drop-shadow-[0_0_15px_rgba(206,85,165,0.15)]">The Brain</span>
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-pink-600 to-[#ce55a5] mx-auto mb-4" />
            <p className="font-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase">Select a hotspot to analyze neurochemical effects</p>
          </div>
          <BrainInteractive />
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className="border-t border-white/[0.06] bg-[#05080d] px-6 py-20 md:py-28 scroll-mt-24" aria-label="Research and statistics">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase mb-3">
              Scientific <span className="text-[#ce55a5] drop-shadow-[0_0_15px_rgba(206,85,165,0.15)]">Evidence</span>
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-pink-600 to-[#ce55a5] mx-auto mb-4" />
            <p className="text-gray-400 text-sm md:text-base max-w-[54ch] mx-auto leading-relaxed font-light">
              Adolescence is a critical window for neurological development. Peer-reviewed research demonstrates that early nicotine exposure causes lasting chemical alterations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {STATS.map((s) => (
              <div key={s.stat} className="relative group overflow-hidden rounded-2xl p-6 text-center bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] hover:border-[#ce55a5]/35 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(206,85,165,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ce55a5]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono text-4xl md:text-5xl font-black text-[#ce55a5] leading-none tracking-tight drop-shadow-[0_0_12px_rgba(206,85,165,0.25)]">{s.stat}</p>
                <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed max-w-[190px] mx-auto font-light">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-[#07080f]/60 backdrop-blur-sm p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <h3 className="font-mono text-[10px] text-[#ce55a5] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ce55a5]" />Key Scientific Sources
              </h3>
              <ul className="divide-y divide-white/[0.05] text-sm text-gray-400" role="list">
                {SOURCES.map((src, i) => (
                  <li key={i} className="py-4 first:pt-0 last:pb-0">
                    <a href={src.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-medium text-gray-200 hover:text-[#ce55a5] transition-colors">
                      {src.title}
                      <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" suppressHydrationWarning>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                    <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">{src.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/[0.06] px-6 py-20 md:py-28 scroll-mt-24" aria-label="About this project">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase mb-3">
              About <span className="text-[#ce55a5] drop-shadow-[0_0_15px_rgba(206,85,165,0.15)]">Us</span>
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-pink-600 to-[#ce55a5] mx-auto mb-4" />
            <p className="font-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase">Biomed Journal Project</p>
          </div>
          <div className="space-y-8 text-gray-400 text-sm md:text-base leading-relaxed font-light font-sans text-center">
            <p>
              This platform is a research initiative made by a team under the BioMed Journal. The BioMed Journal is a student led organization based in Bay Area aiming to bridge the gap between research in lab and classroom. Our goal is to encourage students, while equipping them with skills, to pursue research initiatives in their futures.
            </p>
            <div className="mt-8 rounded-xl border border-[#ce55a5]/10 bg-pink-950/10 p-5 text-xs text-gray-500 border-l-4 border-l-[#ce55a5]/80 leading-relaxed font-light text-left">
              <span className="font-mono font-semibold text-[10px] text-[#ce55a5] block mb-1 uppercase tracking-wider">Medical Disclaimer</span>
              This platform is designed for educational demonstration purposes only and does not constitute medical advice. If you or someone you know is seeking help with nicotine or substance cessation, please visit{" "}
              <a href="https://smokefree.gov/" target="_blank" rel="noopener noreferrer" className="text-[#ce55a5] hover:text-pink-400 transition-colors font-medium underline underline-offset-2">smokefree.gov</a>{" "}
              or consult a healthcare professional.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] bg-black/25 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-gray-600 tracking-wider">BIGGY<span className="text-[#ce55a5]/50">BRAIN</span> · Biomed Journal Project</span>
          <span className="font-mono text-[10px] text-gray-600 text-center sm:text-right tracking-wider">Educational use only · Sources: NIH · NIDA · PubMed</span>
        </div>
      </footer>
    </main>
  );
}
