export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen py-16 px-6">
      {/* Mimics .page-content wrapper rules from style.css */}
      <section className="max-w-3xl mx-auto bg-[#07080f] border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 border-b border-[#ce55a5]/30 pb-4">
          About Us
        </h1>

        <p className="text-gray-300 font-serif text-base md:text-lg leading-relaxed mb-8 font-normal">
          This platform is a research initiative made by a team under the BioMed Journal.
          The BioMed Journal is a student led organization based in Bay Area aiming to bridge the
          gap between research in lab and classroom. Our goal is to encourage students, while
          equipping them with skills, to pursue research initiatives in their futures.
        </p>

        {/* Medical Disclaimer Frame */}
        <div className="rounded-xl border border-[#ce55a5]/20 bg-pink-950/10 p-5 text-xs text-gray-500 border-l-4 border-l-[#ce55a5] leading-relaxed font-sans font-normal">
          <span className="font-mono font-bold text-[10px] text-[#ce55a5] block mb-1 uppercase tracking-wider">
            Medical Disclaimer
          </span>
          This platform is designed for educational demonstration purposes only and does not constitute medical advice.
          If you or someone you know is seeking help with nicotine or substance cessation, please visit{" "}
          <a href="https://smokefree.gov/" target="_blank" rel="noopener noreferrer" className="text-[#ce55a5] hover:text-pink-400 transition-colors font-medium underline underline-offset-2">
            smokefree.gov
          </a>{" "}
          or consult a healthcare professional.
        </div>
      </section>
    </main>
  );
}
