export default function InquiryPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold border-b-4 border-black pb-3">
        The Inquiry
      </h1>

      <div className="bg-yellow-100 border-2 border-yellow-500 p-6">
        <h2 className="text-lg font-bold mb-2 uppercase">Research Question</h2>
        <p className="text-xl md:text-2xl font-semibold">
          How do social media algorithms impact the creative identity of small
          independent visual artists?
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Literature Gap</h2>
        <p className="text-base leading-relaxed">
          While there is a vast amount of literature regarding influencers,
          YouTubers, and other individuals that rely upon the social media
          platforms as their means of income and industry, there is little
          literature that discusses small visual artists such as painters,
          illustrators, photographers, tattoo artists, and digital artists.
          These visual artists that do not utilize the social media platforms as
          a source of their income are often ignored by the social media
          platforms themselves, as well as by the scholars that investigate
          their use of those platforms. Thus, this determined area for study is
          motivated both by the fact that these visual artists are aware of the
          impact that social media algorithms have upon them and their art, and
          because their concept of creativity is impacted accordingly by those
          invisible algorithms.
        </p>
      </div>
    </div>
  )
}
