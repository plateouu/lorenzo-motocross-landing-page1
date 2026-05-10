export default function LiteraturePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold border-b-4 border-black pb-3">
        Literature &amp; Context
      </h1>

      <p className="text-base leading-relaxed">
        This research utilizes the information published by three groups of
        authors and researchers regarding social media algorithms and their
        impact upon various groups.
      </p>

      <p className="text-base leading-relaxed">
        First, authors such as Gillespie (2014), Beer (2017), and Kitchin
        (2017) have published research regarding the assumption that
        recommendation systems, like social media recommendation systems, are
        actors within the culture that can impact and control the content that
        is published on those platforms. Furthermore, authors such as Bucher
        (2017), Eslami et al. (2015), and DeVito, Gergle, and Birnholtz (2017)
        have published research regarding the reactions of the users to social
        media algorithms. Finally, authors such as Nieborg and Poell (2018),
        Duffy (2017, 2020), Cotter (2019), Bishop (2019), Abidin (2016), Baym
        (2018), Cunningham and Craig (2019), Noble (2018), and Striphas (2015)
        have performed research that reflects the impact of social media
        platforms upon visual artists, such as the pressures that they place
        upon those visual artists to produce content within their platforms,
        and the duties of those visual artists that wish to gain popularity on
        those platforms and within those social media environments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="border-2 border-black overflow-hidden">
          <img
            src="/images/gillespie-map.jpg"
            alt="Gillespie Socio-Technical Map showing the complexity of algorithmic systems"
            className="w-full h-auto"
          />
          <p className="bg-black text-white text-sm font-bold p-3 text-center">
            Fig 1: Socio-Technical Map (Gillespie, 2014)
          </p>
        </div>
        <div className="border-2 border-black overflow-hidden">
          <img
            src="/images/Digital-gatekeeping-in-a-mass-dissemination-framework.png"
            alt="Bruns Digital Gatekeeping Model"
            className="w-full h-auto"
          />
          <p className="bg-black text-white text-sm font-bold p-3 text-center">
            Fig 2: Digital Gatekeeping (Bruns, 2017)
          </p>
        </div>
      </div>
    </div>
  )
}
