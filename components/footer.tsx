"use client"

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-white/80 py-16 px-4">
       <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
             <h4 className="text-white font-serif text-lg">Brown University</h4>
             <p className="text-sm leading-relaxed">Providence, Rhode Island 02912, USA</p>
             <p className="text-sm leading-relaxed">401-863-1000</p>
          </div>
          <div>
             <h4 className="text-white font-serif text-lg mb-4">Academics</h4>
             <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">The College</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Graduate School</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Medical School</a></li>
                <li><a href="#" className="hover:text-white transition-colors">School of Engineering</a></li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-serif text-lg mb-4">Campus Life</h4>
             <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Athletics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health & Wellness</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Diversity & Inclusion</a></li>
             </ul>
          </div>
           <div>
             <h4 className="text-white font-serif text-lg mb-4">Connect</h4>
             <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
             </div>
          </div>
       </div>
    </footer>
  )
}
