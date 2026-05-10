export default function MethodologyPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold border-b-4 border-black pb-3">
        Methodology
      </h1>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Qualitative Discourse Analysis</h2>
        <p className="text-base leading-relaxed">
          The discourse analysis that was performed is utilized to determine how
          the artists within various communities across the visual art medium
          discuss the concept of algorithms and how they have impacted their
          medium or their artists.
        </p>
        <p className="text-base leading-relaxed">
          The texts that were collected were collected through search terms like
          &quot;Instagram algorithm artists,&quot; &quot;Instagram dead for artists,&quot; and
          &quot;independent artists social media algorithm,&quot; as well as any related
          terms.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Two-Pass Coding Process</h2>
        <p className="text-base leading-relaxed">
          The unit of analysis that was used in this research was meaning units
          within the texts from each artist and social media company. Meaning
          units are the individual sentences or paragraphs within the texts that
          make a specific claim regarding the topics that were analyzed in the
          texts. Each of the texts was read by the researcher, and each meaning
          unit related to the research question was highlighted.
        </p>
        <div className="bg-gray-50 border-2 border-gray-200 p-5 space-y-3">
          <p className="text-base">
            <strong>Pass 1:</strong> The first pass into the data involved
            creating codes that described each of the highlighted meaning units.
            For instance, one code might have been created for meaning units
            regarding audience instability, another for visibility, and so on.
          </p>
          <p className="text-base">
            <strong>Pass 2:</strong> The second pass involved grouping the codes
            that were created during the first pass into three main categories.
            This two-pass coding process is in accordance with recommendations
            for thematic analyses of texts, as suggested by Braun and Clarke
            (2006) and Nowell et al. (2017).
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Nine Primary Texts</h2>
        <p className="text-base leading-relaxed">
          The nine texts that were analyzed in this research include six texts
          written by and for visual artists, and three official texts published
          by the social media platforms:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-600 px-4 py-3 text-left">Source</th>
                <th className="border border-gray-600 px-4 py-3 text-left">Type</th>
                <th className="border border-gray-600 px-4 py-3 text-left">Focus</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2">Kahn (2025) — Hyperlux</td>
                <td className="border border-gray-300 px-4 py-2">Artist-facing article</td>
                <td className="border border-gray-300 px-4 py-2">Reach collapse, burnout, alternatives</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">GinAngieLa.com (2024)</td>
                <td className="border border-gray-300 px-4 py-2">Artist essay</td>
                <td className="border border-gray-300 px-4 py-2">Account status, paid boosts</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2">Saturno (2024a)</td>
                <td className="border border-gray-300 px-4 py-2">Artist blog post</td>
                <td className="border border-gray-300 px-4 py-2">Paid visibility, independent survival</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Saturno (2024b)</td>
                <td className="border border-gray-300 px-4 py-2">Artist blog post</td>
                <td className="border border-gray-300 px-4 py-2">Website/newsletter response</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 px-4 py-2">Leger (n.d.)</td>
                <td className="border border-gray-300 px-4 py-2">Artist studio blog</td>
                <td className="border border-gray-300 px-4 py-2">Authenticity, local networks</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Ganguly (2025)</td>
                <td className="border border-gray-300 px-4 py-2">Artist advice article</td>
                <td className="border border-gray-300 px-4 py-2">Process content, algorithm anxiety</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2">Mosseri (2023)</td>
                <td className="border border-gray-300 px-4 py-2">Platform explainer</td>
                <td className="border border-gray-300 px-4 py-2">Instagram ranking</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2">TikTok (2020)</td>
                <td className="border border-gray-300 px-4 py-2">Platform explainer</td>
                <td className="border border-gray-300 px-4 py-2">For You feed signals</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2">YouTube Help (n.d.)</td>
                <td className="border border-gray-300 px-4 py-2">Platform explainer</td>
                <td className="border border-gray-300 px-4 py-2">Recommendation signals</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed">
          These texts were collected both from the artists themselves, as well
          as from the social media companies in their official publications
          discussing the concept of algorithms.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Ethics &amp; Replicability</h2>
        <p className="text-base leading-relaxed">
          The texts that were used in this research were all publicly available
          texts, which were published by and for the artists and their
          audiences. Thus, no private texts, usernames, or other personally
          identifiable and nonconsented data was collected from these authors.
          Furthermore, the intention of using these texts was to reveal no
          specific texts or artists by name, only the general discourse
          regarding the experiences of artists with social media algorithms.
          Thus, this research is both ethical and replicable.
        </p>
      </div>
    </div>
  )
}
