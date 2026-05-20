import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080B10] flex items-center justify-center px-6 dot-grid">
      <div className="text-center max-w-lg">
        <div className="font-[family-name:var(--font-syne)] text-[120px] font-bold text-[#45f1c3] leading-none mb-4 tracking-tighter">
          404
        </div>
        <h1 className="font-[family-name:var(--font-syne)] text-[28px] font-bold text-[#d9e3f7] mb-4">
          Page not found
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] text-[16px] text-[#bacac2] mb-8 leading-relaxed">
          This page doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[#00d4a8] text-[#00382a] font-bold px-8 py-3 rounded-lg hover:shadow-[0_0_30px_rgba(0,212,168,0.3)] transition-all font-[family-name:var(--font-dm-sans)]"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="border border-[#1C2330] text-[#d9e3f7] px-8 py-3 rounded-lg hover:bg-[#16202e] hover:border-[#45f1c3]/40 transition-all font-[family-name:var(--font-dm-sans)]"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
