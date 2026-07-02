import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicotine Addiction - Brain",
  description: "Biomed Journal Project exploring nicotine's effects on the brain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white font-serif font-bold antialiased">
        {/* GLOBAL HEADER - Mimics .site-header exactly from style.css */}
        <header className="bg-[#ce55a5] h-[70px] sticky top-0 px-8 flex items-center justify-between z-[1000] shadow-md select-none">
          <nav className="flex gap-8 items-center">
            <a href="/" className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] hover:underline transition-all">
              Homepage
            </a>
            <a href="/brain" className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] hover:underline transition-all">
              Zoomed In
            </a>
            <a href="/about" className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] hover:underline transition-all">
              About Us
            </a>
            <a href="/sources" className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] hover:underline transition-all">
              Sources
            </a>
          </nav>
          <span className="text-white font-serif font-bold text-[1.1rem] tracking-[0.05em] hidden sm:inline">
            Nicotine Effects: The Brain
          </span>
        </header>

        {children}
      </body>
    </html>
  );
}
