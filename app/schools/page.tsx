"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SCHOOLS = [
  { name: "Cornell", url: "https://engage.admissions.cornell.edu/portal/status", status: "Accepted" },
  { name: "NJIT", url: "https://connect.njit.edu/apply/", status: "Accepted" },
  { name: "Penn State", url: "https://mypennstate.psu.edu/index.cfm/login/expireSession?src=1", status: "Accepted" },
  { name: "UChicago", url: "https://app.scoir.com/student/redirect/appl/2100230/695b7ca35e352341b9003635/sso" },
  { name: "Columbia", url: "https://apply.college.columbia.edu/apply/status" },
  { name: "Yale", url: "https://apps.admissions.yale.edu/account/login?r=https%3a%2f%2fapps.admissions.yale.edu%2fapply%2fstatus%3fbutton%3dadmCkl&cookie=1" },
  { name: "Dartmouth", url: "https://apply.dartmouth.edu/apply/status?tab=home" },
  { name: "Northwestern", url: "https://mx.technolutions.net/ss/c/u001.-JLG6By4-20xZllkVwUz4cHkwG8G1SwkHhup6J6Dqn2Ldi7uzqn8jgucawlFvzbWwHKlj6MNA6vyagKZeH0ELd1SD4YlDikvaciP44dwHunho8AVVCuVPJOpdoUhr0B10aRKo-DRaYcmkKT23g6IHA/4mz/Ow9JbU6oQQmEVYm8EYG_zQ/h0/h001.w-gaWYVQPz5CBbZSyJCYIvBf80Uuhzpx77fHL3jkMqE" },
  { name: "Bowdoin", url: "https://admissions.bowdoin.edu/account/login?r=https%3a%2f%2fadmissions.bowdoin.edu%2fapply%2fstatus&cookie=1" },
  { name: "UVA", url: "https://apply.undergradadmission.virginia.edu/apply/status?tab=admission", status: "Rejected" },
  { name: "Emory", url: "https://admission.emory.edu/apply/status" },
  { name: "CMU", url: "https://admission.cmu.edu/account/login?r=https%3a%2f%2fadmission.cmu.edu%2fportal%2fwhere_am_i" },
  { name: "Tufts", url: "https://ugrad.admissions.tufts.edu/account/login?r=https%3a%2f%2fugrad.admissions.tufts.edu%2fportal%2fstatus%3fcmd%3dapplicants" },
  { name: "Boston College", url: "https://admission.bc.edu/account/login?r=https%3a%2f%2fadmission.bc.edu%2fportal%2fstatus" },
  { name: "Northeastern", url: "https://apply.northeastern.edu/portal/app_status?utm_campaign=FRapplicant&utm_content=ASC_appacknowledge&utm_medium=email&utm_source=deliver&utm_term=fa26" },
  { name: "Purdue", url: "https://apply.purdue.edu/apply/status?cmd=status#gsc.tab=0", status: "Waitlisted" },
  { name: "UF", url: "https://undergrad.admissions.ufl.edu/apply/", status: "Accepted" },
  { name: "Rutgers", url: "https://rutgers.my.site.com/ApplicantPortal/AppPortalCustom", status: "Accepted" },
  { name: "NYU", url: "https://connect.nyu.edu/portal/undergraduate?tab=welcome" },
  { name: "Boston University", url: "https://shib.bu.edu/idp/profile/SAML2/POST-SimpleSign/SSO?execution=e1s1" },
  { name: "Carnegie Mellon", url: "https://admission.cmu.edu/account/login?r=https%3a%2f%2fadmission.cmu.edu%2fportal%2fwhere_am_i" },
  { name: "Brown", url: "https://apply.college.brown.edu/account/login?r=https%3a%2f%2fapply.college.brown.edu%2fapply%2fstatus" },
  { name: "Duke", url: "https://admiss.ugrad.duke.edu/account/login" },
]

export default function SchoolsPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("schools_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "taylor2008!") {
      setIsAuthenticated(true)
      localStorage.setItem("schools_auth", "true")
      setError(false)
    } else {
      setError(true)
      setPassword("")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("schools_auth")
    setIsAuthenticated(false)
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-blue-100">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-sm bg-white p-8 modern-border modern-shadow">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight mb-2">College Portals</h1>
                <p className="text-sm text-[#8E8E93]">Please enter the access password to continue.</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-4 bg-[#F5F5F7] modern-border focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} font-medium transition-all`}
                  placeholder="Password"
                  autoFocus
                />
                {error && (
                  <p className="text-xs text-red-500 font-medium italic">Incorrect password. Please try again.</p>
                )}
                <button
                  type="submit"
                  className="modern-button w-full flex justify-center py-4"
                >
                  Enter Archive
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto p-8 md:p-24"
          >
            <div className="flex justify-between items-end mb-16 pb-8 border-b border-[#F5F5F7]">
              <div>
                <h1 className="text-4xl font-bold tracking-tighter mb-4">Portals</h1>
                <p className="text-[#8E8E93] font-medium uppercase tracking-widest text-[10px]">Fall 2026 Admissions Archive</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] hover:text-[#1D1D1F] transition-colors"
              >
                Lock Session
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCHOOLS.map((school) => (
                <a
                  key={school.name}
                  href={school.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white p-8 modern-border modern-shadow-hover transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">{school.name}</h2>
                      {school.status && (
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 modern-border ${school.status === "Accepted"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : school.status === "Rejected"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : school.status === "Waitlisted"
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                          }`}>
                          {school.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] group-hover:text-[#1D1D1F] transition-colors">
                      Open Portal
                    </span>
                    <svg
                      className="w-3 h-3 text-[#D1D1D6] group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer Branding */}
            <div className="mt-32 pt-12 border-t border-[#F5F5F7] flex justify-between items-center opacity-40 grayscale">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-tight">Taylor Daan</span>
                <div className="w-1 h-1 bg-[#D1D1D6] rounded-full" />
                <span className="text-[9px] font-medium uppercase tracking-widest text-[#8E8E93]">© 2026</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E8E93]">Admissions Archive</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

