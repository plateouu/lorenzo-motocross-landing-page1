import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-[#2C2420]">
      <h1 className="text-[10rem] font-light leading-none opacity-10">404</h1>
      <p className="text-xl mb-8 -mt-8 font-medium">Page Index Not Found</p>

      <Link href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#A67C52] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  )
}
