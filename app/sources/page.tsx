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
  {
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0026895X24034278",
    title: "ScienceDirect — Molecular Pharmacology Research",
    desc: "Peer-reviewed research article on neurological mechanisms and molecular pharmacology."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3310415/",
    title: "PMC3310415 — National Center for Biotechnology Information",
    desc: "Publicly accessible biomedical study examining neural networks and substance interaction pathways."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8992377/",
    title: "PMC8992377 — Research Literature Record",
    desc: "Scientific overview concerning chronic exposure effects and neurological plasticity."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2755585/",
    title: "PMC2755585 — Central Nervous System Studies",
    desc: "Academic documentation outlining synaptic remodeling and neurotransmitter tracking."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7554201/",
    title: "PMC7554201 — Biological Psychiatry Report",
    desc: "Clinical database entry concerning behavioral impacts and long-term receptor adaptation."
  },
  {
    href: "https://www.chm.bris.ac.uk/motm/nicotine/E-metabolisme.html",
    title: "University of Bristol — Nicotine Metabolism",
    desc: "Chemical and metabolic profile explaining the breakdown and systemic transit of nicotine molecules."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12575229/",
    title: "PMC12575229 — Molecular Neurobiology Data",
    desc: "In-depth indexing of active cellular pathways under chemical simulation regimes."
  },
  {
    href: "https://www.sciencedirect.com/topics/medicine-and-dentistry/ion-channel",
    title: "ScienceDirect Topics — Ion Channel Architecture",
    desc: "Reference manual outlining the gating mechanisms and structures of cellular ion channels."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2928221/",
    title: "PMC2928221 — Neuropharmacology Archive",
    desc: "Peer-reviewed compilation tracing dopamine pathway activation and reinforcement cycles."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3543069/",
    title: "PMC3543069 — Clinical Addictions Review",
    desc: "Life sciences study charting neural pathway susceptibility and receptor upregulation."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2728164/",
    title: "PMC2728164 — Cellular Signaling Data",
    desc: "Research documentation regarding signal transduction across active brain circuits."
  },
  {
    href: "https://www.ebi.ac.uk/pdbe/articles/allure-and-agony-nicotine",
    title: "EMBL-EBI — The Allure and Agony of Nicotine",
    desc: "Structural biology focus on how nicotine interfaces directly with nicotinic acetylcholine receptors."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6656632/",
    title: "PMC6656632 — Behavioral Neuroscience Database",
    desc: "Investigative write-up evaluating habit-forming feedback loops and cognitive performance alterations."
  },
  {
    href: "https://psychiatryonline.org/doi/abs/10.1176/appi.ajp.161.7.1211",
    title: "American Journal of Psychiatry — Clinical Index",
    desc: "Abstract detailing psychiatric observation criteria and neurochemical dependency traits."
  },
  {
    href: "https://europepmc.org/article/med/7754303",
    title: "Europe PMC — Biomedical Literature Archive",
    desc: "International index logging foundational research records on neurotransmitter dynamics."
  },
  {
    href: "https://academic.oup.com/ntr/article/21/6/764/4951920?guestAccessKey=",
    title: "Oxford Academic — Nicotine & Tobacco Research",
    desc: "Academic journal study exploring molecular and public health impacts of electronic delivery systems."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3830589/",
    title: "PMC3830589 — Translational Psychiatry Report",
    desc: "Analysis showing the structural adaptations and vulnerabilities of the youthful striatum."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3662348/",
    title: "PMC3662348 — Synaptic Plasticity Document",
    desc: "Research regarding dendritic spine density modifications resulting from chronic substance use."
  },
  {
    href: "https://pubmed.ncbi.nlm.nih.gov/15743669/",
    title: "PubMed Entry 15743669 — Neurotransmitter Regulation",
    desc: "Indexed literature investigating nicotinic receptor subunits and processing kinetics."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2903639/",
    title: "PMC2903639 — Trends in Neurosciences",
    desc: "Comprehensive analysis on brain reward system engineering and chronic chemical stimuli."
  },
  {
    href: "https://www.health.harvard.edu/mind-and-mood/dopamine-the-pathway-to-pleasure",
    title: "Harvard Health — Dopamine: The Pathway to Pleasure",
    desc: "Exploration of the human pleasure center, focusing on how neurons in the VTA generate reward tracking."
  },
  {
    href: "https://www.ncbi.nlm.nih.gov/books/NBK538143/",
    title: "NCBI Bookshelf — Neuroanatomy and Reward Circuits",
    desc: "Medical textbook chapter detailing the physical geography of the Ventral Tegmental Area and Striatum."
  },
  {
    href: "https://www.biotechniques.com/molecular-biology/neurons-on-nicotine/",
    title: "BioTechniques — Neurons on Nicotine",
    desc: "Molecular overview analyzing live-cell imaging of cellular responses to sustained nicotine introduction."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4850498/",
    title: "PMC4850498 — Cognitive Control Assessment",
    desc: "Scientific overview detailing frontostriatal connectivity variations during adolescent development."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7714688/",
    title: "PMC7714688 — Gene Expression Studies",
    desc: "Analysis of localized transcription factor modifications resulting from regular tobacco use."
  },
  {
    href: "https://www.frontiersin.org/journals/behavioral-neuroscience/articles/10.3389/fnbeh.2014.00008/full",
    title: "Frontiers — Behavioral Neuroscience Matrix",
    desc: "Open-access study analyzing reward contextual memory cues and extinction resistance."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4561406/",
    title: "PMC4561406 — Neurobiology of Learning",
    desc: "Research mapping the transition of reward signaling from the ventral to the dorsal striatum."
  },
  {
    href: "https://www.khanacademy.org/test-prep/mcat/processing-the-environment/memory/v/long-term-potentiation-and-synaptic-plasticity",
    title: "Khan Academy — LTP and Synaptic Plasticity",
    desc: "Educational breakdown of long-term potentiation as the foundational molecular engine for learning."
  },
  {
    href: "https://www.sciencedirect.com/science/article/pii/B9780123964564000067",
    title: "ScienceDirect — International Review of Neurobiology",
    desc: "Book chapter exploring structural updates and neurogenesis inhibition under chemical dependancy regimes."
  },
  {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7718856/",
    title: "PMC7718856 — Therapeutic Interventions Archive",
    desc: "Research targeting biochemical recovery timelines and neural resetting methods."
  },
  {
    href: "https://www.youtube.com/watch?v=-mHgPfXHzJE",
    title: "YouTube Video — Visualizing Addiction Pathways",
    desc: "Video breakdown detailing active neural systems, receptor mapping, and cellular behaviors."
  },
  {
    href: "https://doi.org/10.1177/1073858418824256",
    title: "The Neuroscientist — The Striatum's Role in Economic Behaviors",
    desc: "Review journal article examining how the striatum governs rational and irrational decision-making circuits."
  },
  {
    href: "https://www.brainfacts.org/archives/2011/addiction-and-brain-circuits",
    title: "BrainFacts.org — Addiction and Brain Circuits",
    desc: "Society for Neuroscience overview of how repeated substance exposure rewires brain circuitry."
  },
  {
    href: "https://doi.org/10.1016/j.biocel.2004.09.009",
    title: "Int'l Journal of Biochemistry & Cell Biology — Dopaminergic Neurons",
    desc: "Cellular biology review of dopaminergic neuron structure and function."
  },
  {
    href: "https://my.clevelandclinic.org/health/articles/22513-neurotransmitters",
    title: "Cleveland Clinic — Neurotransmitters: What They Are, Functions & Types",
    desc: "Clinical overview explaining the roles and types of chemical messengers in the nervous system."
  },
  {
    href: "https://doi.org/10.1101/cshperspect.a012146",
    title: "Cold Spring Harbor Perspectives — GABA and Glutamate in Nicotine Dependence",
    desc: "Research review on the roles of inhibitory and excitatory neurotransmitter systems in nicotine dependence."
  },
  {
    href: "https://doi.org/10.1016/B978-0-12-396456-4.00006-7",
    title: "Progress in Molecular Biology — Signaling in Striatal Neurons",
    desc: "Book chapter detailing phosphoprotein signaling cascades within striatal neurons."
  },
  {
    href: "https://doi.org/10.1101/cshperspect.a012120",
    title: "Cold Spring Harbor Perspectives — Adolescent Nicotine Exposure and Prefrontal Cortex",
    desc: "Review of short- and long-term consequences of adolescent nicotine exposure on neuronal network function."
  },
  {
    href: "https://doi.org/10.1016/j.bcp.2009.06.011",
    title: "Biochemical Pharmacology — Nicotine-Induced Receptor Upregulation",
    desc: "Study on the mechanisms underlying nicotinic receptor upregulation and its relevance to addiction."
  },
  {
    href: "https://doi.org/10.1101/cshperspect.a039602",
    title: "Cold Spring Harbor Perspectives — Glutamatergic Systems in Opioid Addiction",
    desc: "Review of glutamatergic memory mechanisms underlying opioid addiction."
  },
  {
    href: "https://doi.org/10.1111/j.1369-1600.2010.00213.x",
    title: "Addiction Biology — Cognitive Effects of Nicotine: Genetic Moderators",
    desc: "Research on genetic factors moderating the cognitive effects of nicotine."
  },
  {
    href: "https://doi.org/10.3389/fnins.2025.1670883",
    title: "Frontiers in Neuroscience — Nicotine and Neuronal Nicotinic Acetylcholine Receptors",
    desc: "Review unraveling the mechanisms of nicotine addiction via neuronal nicotinic acetylcholine receptors."
  },
  {
    href: "https://doi.org/10.1007/978-3-030-81147-1_4",
    title: "Advances in Experimental Medicine and Biology — The Brain's Reward System in Health and Disease",
    desc: "Book chapter overview of reward system function and dysfunction."
  },
  {
    href: "https://doi.org/10.1016/j.neuropharm.2013.05.042",
    title: "Neuropharmacology — Glutamatergic and GABAergic Systems in Nicotine Dependence",
    desc: "Study on glutamatergic and GABAergic involvement in nicotine dependence and implications for smoking cessation therapies."
  },
  {
    href: "https://doi.org/10.1124/mol.111.076661",
    title: "Molecular Pharmacology — Nicotine Persistently Activates VTA Dopaminergic Neurons",
    desc: "Research on nicotine's activation of VTA dopaminergic neurons via α4 and α6 subunit-containing receptors."
  },
  {
    href: "https://learnmem.cshlp.org/content/22/9/452",
    title: "Learning & Memory — Reward Processing by the Dorsal Raphe Nucleus",
    desc: "Review of serotonergic and other reward-processing mechanisms in the dorsal raphe nucleus."
  },
  {
    href: "https://lpsonline.sas.upenn.edu/features/neuroscience-and-addiction-unraveling-brains-reward-system",
    title: "Penn LPS Online — Neuroscience and Addiction: Unraveling the Brain's Reward System",
    desc: "University of Pennsylvania overview of the neuroscience underlying addiction and reward."
  },
  {
    href: "https://www.ncbi.nlm.nih.gov/books/NBK557825/",
    title: "StatPearls — Physiology, Acetylcholine",
    desc: "Reference chapter on acetylcholine physiology and receptor function."
  },
  {
    href: "https://doi.org/10.1038/s41380-019-0484-3",
    title: "Molecular Psychiatry — Nucleus Accumbens Medium Spiny Neurons Subtypes",
    desc: "Study on how distinct medium spiny neuron subtypes in the nucleus accumbens signal reward and aversion."
  },
  {
    href: "https://doi.org/10.1016/j.baga.2016.02.001",
    title: "Basal Ganglia — Striatal Dopamine Neurotransmission",
    desc: "Review of dopamine release and uptake regulation within striatal circuitry."
  },
  {
    href: "https://science.howstuffworks.com/nicotine3.htm",
    title: "HowStuffWorks — How Nicotine Works",
    desc: "General-audience explainer on nicotine's path through the body and its effects on the brain."
  },
  {
    href: "https://doi.org/10.1016/j.neuropharm.2020.108256",
    title: "Neuropharmacology — Nicotinic Acetylcholine Receptors and Nicotine Addiction: A Brief Introduction",
    desc: "Introductory review of nicotinic acetylcholine receptor involvement in nicotine addiction."
  },
  {
    href: "https://doi.org/10.1038/nature07768",
    title: "Nature — Nicotine Binding to Brain Receptors Requires a Strong Cation-π Interaction",
    desc: "Structural study identifying the cation-π interaction underlying nicotine's binding to brain receptors."
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
          The verified citations and research databases utilized for the neurological breakdown of nicotine processing within this platform can be reviewed below, or on this{" "}
          <a
            href="https://docs.google.com/document/d/1-LAqKdD2ZjA4Zm3RRbso8s6RaJYhLEuUewrqR0r7hCk/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-semibold text-[#ce55a5] hover:text-[#e26fb9] underline underline-offset-4 transition-colors"
          >
            MLA Page
            <svg className="w-3 h-3 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#ce55a5] hover:text-[#e26fb9]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
          :
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
