export default function ArtifactsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold border-b-4 border-black pb-3">
        Artifacts
      </h1>

      <p className="text-base leading-relaxed">
        Access the full academic paper and presentation below.
      </p>

      <div className="space-y-4">
        <a
          href="/AP_Research_FINAL.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-black px-5 py-4 hover:bg-gray-100 underline text-base"
        >
          Final Academic Paper (4,610 words, PDF)
        </a>

        <a
          href="/ap-research-presentation"
          className="block border border-black px-5 py-4 hover:bg-gray-100 underline text-base"
        >
          18-Slide Presentation
        </a>
      </div>
    </div>
  )
}
