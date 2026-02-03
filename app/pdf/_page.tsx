"use client"

import { useState, useRef } from "react"

export default function PDFPage() {
  const [text, setText] = useState("")
  const [prompt, setPrompt] = useState("")

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-100 p-8 md:p-24 print:p-0 print:bg-white">
      {/* --- UI Controls (Hidden during print) --- */}
      <div className="max-w-4xl mx-auto mb-16 print:hidden">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">PDF Generator</h1>
        <div className="flex flex-col gap-6 bg-white p-8 modern-border modern-shadow rounded-sm">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
              Top Prompt (Topic/Heading)
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 bg-[#F5F5F7] modern-border focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              placeholder="e.g. Research Statement or Project Overview"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
              Main Body Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-6 bg-[#F5F5F7] modern-border focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-lg resize-none"
              placeholder="Enter the main content here..."
            />
          </div>
          <button 
            onClick={handlePrint}
            className="modern-button w-fit self-end"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* --- Document Preview/Print Area --- */}
      <div id="pdf-container" className="hidden print:block md:block max-w-[210mm] mx-auto bg-white modern-border shadow-2xl relative min-h-[297mm] print:shadow-none print:modern-border-none print:w-full print:max-w-none print:bg-transparent">
        
        {/* Subtle Background Loops - Repeated on every page in print */}
        <div className="absolute inset-0 print:fixed pointer-events-none opacity-[0.03] z-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,50 C300,0 600,300 900,150 S1200,0 1440,200 C1600,500 1200,800 800,600 S400,400 0,700 S-200,1000 400,950 S1000,800 1440,1000" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* Branding Footer - Repeated on every page in print */}
        <div className="hidden print:flex fixed bottom-0 left-0 right-0 py-10 justify-between items-center z-50 bg-white border-t border-[#F5F5F7]">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold tracking-tight opacity-40 grayscale">Taylor Daan</span>
            <div className="w-1 h-1 bg-[#D1D1D6] rounded-full opacity-40 grayscale" />
            <span className="text-[9px] font-medium uppercase tracking-widest text-[#8E8E93] opacity-40 grayscale">© 2026</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E8E93] opacity-40 grayscale">Est. 2021</span>
          </div>
        </div>

        {/* --- Printing Table Wrapper (Ensures space for footer on every page) --- */}
        <table className="w-full border-collapse relative z-10">
          <thead className="hidden print:table-header-group">
            <tr>
              <td>
                <div className="h-12" /> {/* Top margin buffer */}
              </td>
            </tr>
          </thead>
          
          <tbody className="print:table-row-group">
            <tr>
              <td>
                {/* Content Area */}
                <div className="px-20 py-24 print:px-20 print:py-24 print:p-0">
                  <div className="flex-grow print:block print-content">
                    {/* Header / Prompt Area */}
                    {prompt && (
                      <div className="mb-8 pb-4 border-b border-[#F5F5F7] print:mb-6">
                        <h2 className="text-[10px] font-medium tracking-[0.05em] text-[#8E8E93]">{prompt}</h2>
                      </div>
                    )}

                    {/* Body Text: 12pt, Left Aligned */}
                    <div className="text-[12pt] leading-[1.6] font-normal text-[#1D1D1F] whitespace-pre-wrap text-left">
                      {text || "Enter text in the main body area to preview it here..."}
                    </div>
                  </div>

                  {/* Web-only Footer (Hidden in print because of the fixed one) */}
                  <div className="mt-20 pt-8 border-t border-[#F5F5F7] flex justify-between items-center opacity-40 grayscale print:hidden">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold tracking-tight">Taylor Daan</span>
                      <div className="w-1 h-1 bg-[#D1D1D6] rounded-full" />
                      <span className="text-[9px] font-medium uppercase tracking-widest text-[#8E8E93]">© 2026</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E8E93]">Est. 2021</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot className="hidden print:table-footer-group">
            <tr>
              <td>
                <div className="h-32" /> {/* RESERVES SPACE FOR FOOTER ON EVERY PAGE */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #pdf-container, #pdf-container * {
            visibility: visible;
          }
          #pdf-container {
            position: relative;
            width: 100%;
            border: none;
            box-shadow: none;
            background: white !important;
            display: block !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Proper internal margins for the whole content block */
          .print-content {
            padding: 25mm 20mm !important;
            display: block !important;
          }

          .text-left {
            line-height: 1.6;
            page-break-inside: auto !important;
            display: block !important;
            overflow: visible !important;
          }

          /* Ensure the fixed elements are positioned relative to the paper, not the margin box */
          .fixed, .print\:fixed {
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
          }

          .fixed.bottom-0, .print\:fixed.bottom-0 {
            bottom: 0 !important;
            padding-bottom: 10mm !important;
            padding-top: 5mm !important;
            padding-left: 20mm !important; /* Match content margin */
            padding-right: 20mm !important; /* Match content margin */
            background: white !important;
            z-index: 100;
          }

          .print\:fixed.top-0 {
            top: 0 !important;
          }

          /* Reset the content area padding and min-height for print since @page margins handle it now */
          .min-h-\[297mm\] {
            min-height: 0 !important;
          }
          .py-24 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .px-20 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
