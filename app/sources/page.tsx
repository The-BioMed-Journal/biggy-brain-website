const SCIENTIFIC_SOURCES = [
  {
    href: "https://nida.nih.gov/publications/drugfacts/tobacco-nicotine-e-cigarettes",
    title: "NIDA — Tobacco, Nicotine & E-Cigarettes",
    desc: "National Institute on Drug Abuse overview of nicotine pharmacology, neurotransmitter receptors, and clinical dependence profiles."
  },
  {
    href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3250973/",
    title: "NIH — Adolescent Brain Development & Vulnerability to Addiction",
    desc: "Neurological analysis detailing why the developing prefrontal cortex shows heightened sensitivity to molecular structural updates from exogenous chemicals."
  },
  {
    href: "https://pubmed.ncbi.nlm.nih.gov/",
    title: "PubMed — Biomedical Literature Database",
    desc: "Search engine access layer for checking peer-reviewed global life science and biomedical research records."
  },
];

export default function SourcesPage() {
  return (
    <main className="bg-black min-h-screen py-16 px-6">
      <section className="max-w-3xl mx-auto bg-[#07080f] border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 border-b border-[#ce55a5]/30 pb-4">
          Sources
        </h1>

        <p className="text-gray-400 font-sans font-normal text-sm mb-8 leading-relaxed">
          The verified citations and research databases utilized for the neurological breakdown of nicotine processing within this platform can be reviewed below:
        </p>

        <ul className="divide-y divide-white/[0.05] text-gray-300 font-sans" role="list">
          {SCIENTIFIC_SOURCES.map((src, idx) => (
            <li key={idx} className="py-5 first:pt-0 last:pb-0">
              <a
                href={src.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#ce55a5] transition-colors font-serif text-base"
              >
                {src.title}
                <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ce55a5]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
              <p className="text-xs text-gray-500 mt-1.5 font-light leading-relaxed max-w-[65ch]">
                {src.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
