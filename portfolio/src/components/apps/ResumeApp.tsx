'use client'

import * as React from 'react'

const ACCENT = '#0F766E'

export default function ResumeApp() {
  const [failed, setFailed] = React.useState(false)

  return (
    <div className="flex h-full w-full flex-col bg-[#F2F2F5] text-[#1D1D1F]">
      {/* ── Toolbar ── */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/[0.08] bg-[#FAFAFC] px-4 py-2">
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-semibold">Aritra Dutta — Resume</p>
          <p className="truncate text-[10.5px] text-[#86868B]">PDF · opens in a new tab to download</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="os-focusable rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-[#F0F0F3]"
          >
            Open
          </a>
          <a
            href="/resume.pdf"
            download="Aritra-Dutta-Resume.pdf"
            className="os-focusable rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            Download
          </a>
        </div>
      </div>

      {/* ── Viewer ── */}
      <div className="min-h-0 flex-1 p-3">
        {failed ? (
          <div className="grid h-full place-items-center rounded-lg border border-dashed border-black/15 bg-white px-6 text-center">
            <div>
              <p className="text-[13px] font-medium">This browser can’t preview PDFs inline.</p>
              <p className="mt-1 text-[12px] text-[#6E6E73]">
                Use the Download button above to grab the PDF.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src="/resume.pdf#view=FitH"
            title="Aritra Dutta — Resume PDF"
            className="h-full w-full rounded-lg border border-black/[0.08] bg-white"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  )
}
