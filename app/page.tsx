import BrainScrollReveal from "./BrainScrollReveal";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen pb-20">
      {/* Page Title - Mimics .home-title from style.css */}
      <h1 className="text-center mt-14 mb-12 text-5xl md:text-6xl font-serif font-bold tracking-tight text-white">
        Nicotine Addiction : Zoomed In
      </h1>

      {/* Parallax Container */}
      <div className="w-full">
        <BrainScrollReveal />
      </div>
    </main>
  );
}
