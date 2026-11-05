import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-[#f4f4f5] px-6 py-16 selection:bg-[#c8a46b]/20">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e0f12] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle top ambient glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-[#c8a46b]/10 blur-3xl pointer-events-none"
        />

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[#c8a46b] mb-4">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>404 // Status: Not Found</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white">
          Route Not Located
        </h1>

        <p className="mt-4 text-sm md:text-base text-[#a1a1aa] leading-relaxed">
          The requested system endpoint does not exist, has been migrated, or is
          temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c8a46b] px-4 py-2.5 text-xs font-mono font-medium text-black hover:bg-[#d6b47c] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/classic"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-xs font-mono text-[#a1a1aa] hover:text-white hover:border-white/25 transition-colors"
          >
            <span>Plain-Text Version</span>
          </Link>
        </div>

        <div className="mt-6 text-[0.6875rem] font-mono text-[#8a8a93]">
          Canonical: <span className="text-white/60">aritrodutta.tech</span>
        </div>
      </div>
    </div>
  );
}
