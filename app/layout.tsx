import type { Metadata } from "next";
import "./globals.css";
import Nav from "./Nav";

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
        <Nav />

        {children}
      </body>
    </html>
  );
}
