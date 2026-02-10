'use client'

import { useState, useRef, useEffect } from 'react'

// Unicode Fraktur conversion
const toFraktur = (text: string): string => {
    const map: Record<string, string> = {
        'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌',
        'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓',
        'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚',
        'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
        'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲',
        'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹',
        'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀',
        'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
    }
    return text.split('').map(c => map[c] || c).join('')
}

export default function LogoMakerPage() {
    const [topText, setTopText] = useState('plateou')
    const [bottomText, setBottomText] = useState('MC')
    const [topSize, setTopSize] = useState(100)
    const [mcColor, setMcColor] = useState('#5a4a3a')
    const [plateouColor, setPlateouColor] = useState('#ffd700')
    const [mcStroke, setMcStroke] = useState(12)
    const [plateouStroke, setPlateouStroke] = useState(6)
    const [dropShadow, setDropShadow] = useState(true)
    const [shadowBlur, setShadowBlur] = useState(15)
    const [shadowOffset, setShadowOffset] = useState(5)
    const [glowEnabled, setGlowEnabled] = useState(true)
    const [glowIntensity, setGlowIntensity] = useState(20)
    const [bgType, setBgType] = useState<'black' | 'transparent'>('black')
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [fontLoaded, setFontLoaded] = useState(false)

    useEffect(() => {
        const font = new FontFace('EffraHeavy', 'url(/fonts/Effra%20Heavy.ttf)')
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont)
            setFontLoaded(true)
        }).catch(() => setFontLoaded(true))
    }, [])

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 512
        canvas.width = size
        canvas.height = size
        ctx.clearRect(0, 0, size, size)

        const centerX = size / 2
        const centerY = size / 2

        if (bgType === 'black') {
            ctx.fillStyle = '#0a0a0a'
            ctx.fillRect(0, 0, size, size)
        }

        const frakturText = toFraktur(topText.toLowerCase())

        const offscreen = document.createElement('canvas')
        offscreen.width = size
        offscreen.height = size
        const offCtx = offscreen.getContext('2d')
        if (!offCtx) return

        // Draw MC
        offCtx.textAlign = 'center'
        offCtx.textBaseline = 'middle'
        offCtx.font = `bold 280px EffraHeavy, sans-serif`

        // Glow for MC
        if (glowEnabled && bgType === 'black') {
            offCtx.shadowColor = plateouColor
            offCtx.shadowBlur = glowIntensity
        }

        // Drop shadow
        if (dropShadow) {
            offCtx.shadowColor = 'rgba(0, 0, 0, 0.5)'
            offCtx.shadowBlur = shadowBlur
            offCtx.shadowOffsetX = shadowOffset
            offCtx.shadowOffsetY = shadowOffset
        }

        if (bgType === 'transparent' && mcStroke > 0) {
            offCtx.strokeStyle = '#000000'
            offCtx.lineWidth = mcStroke * 2
            offCtx.lineJoin = 'round'
            offCtx.strokeText(bottomText, centerX, centerY + 20)
        }

        offCtx.fillStyle = mcColor
        offCtx.fillText(bottomText, centerX, centerY + 20)
        offCtx.shadowColor = 'transparent'
        offCtx.shadowBlur = 0
        offCtx.shadowOffsetX = 0
        offCtx.shadowOffsetY = 0

        // Knockout plateou area
        offCtx.globalCompositeOperation = 'destination-out'
        offCtx.font = `${topSize}px serif`
        offCtx.lineWidth = 22
        offCtx.strokeText(frakturText, centerX, centerY)
        offCtx.fillText(frakturText, centerX, centerY)

        ctx.drawImage(offscreen, 0, 0)

        // Draw plateou
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = `${topSize}px serif`

        // Glow for plateou
        if (glowEnabled) {
            ctx.shadowColor = plateouColor
            ctx.shadowBlur = glowIntensity * 0.8
        }

        // Drop shadow
        if (dropShadow && !glowEnabled) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
            ctx.shadowBlur = shadowBlur
            ctx.shadowOffsetX = shadowOffset
            ctx.shadowOffsetY = shadowOffset
        }

        if (bgType === 'transparent' && plateouStroke > 0) {
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = plateouStroke * 2
            ctx.lineJoin = 'round'
            ctx.strokeText(frakturText, centerX, centerY)
        }

        ctx.fillStyle = plateouColor
        ctx.fillText(frakturText, centerX, centerY)
        ctx.shadowColor = 'transparent'

    }, [topText, bottomText, topSize, mcColor, plateouColor, mcStroke, plateouStroke, dropShadow, shadowBlur, shadowOffset, glowEnabled, glowIntensity, bgType, fontLoaded])

    const downloadLogo = () => {
        if (!canvasRef.current) return
        const link = document.createElement('a')
        link.download = `plateoumc-logo-${bgType}.png`
        link.href = canvasRef.current.toDataURL('image/png')
        link.click()
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-neutral-100">Logo Maker</h1>
                    <p className="text-neutral-500">Negative space with customizable effects.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4 bg-neutral-900 rounded-xl p-5 border border-neutral-800 max-h-[85vh] overflow-y-auto">
                        <h2 className="text-lg font-semibold text-neutral-200">Customize</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Front Text</label>
                                <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Back Text</label>
                                <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value.toUpperCase())} className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Plateou Color</label>
                                <input type="color" value={plateouColor} onChange={(e) => setPlateouColor(e.target.value)} className="w-full h-10 bg-neutral-800 border border-neutral-700 rounded-lg cursor-pointer" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">MC Color</label>
                                <input type="color" value={mcColor} onChange={(e) => setMcColor(e.target.value)} className="w-full h-10 bg-neutral-800 border border-neutral-700 rounded-lg cursor-pointer" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Front Size: {topSize}px</label>
                            <input type="range" min="60" max="120" value={topSize} onChange={(e) => setTopSize(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-neutral-400" />
                        </div>

                        {/* Glow Toggle */}
                        <div className="flex items-center justify-between py-1">
                            <label className="text-xs font-medium text-neutral-400">Glow Effect</label>
                            <button onClick={() => setGlowEnabled(!glowEnabled)} className={`w-10 h-5 rounded-full transition-all ${glowEnabled ? 'bg-amber-500' : 'bg-neutral-700'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${glowEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </button>
                        </div>

                        {glowEnabled && (
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1">Glow: {glowIntensity}</label>
                                <input type="range" min="0" max="50" value={glowIntensity} onChange={(e) => setGlowIntensity(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-amber-500" />
                            </div>
                        )}

                        {/* Drop Shadow Toggle */}
                        <div className="flex items-center justify-between py-1">
                            <label className="text-xs font-medium text-neutral-400">Drop Shadow</label>
                            <button onClick={() => setDropShadow(!dropShadow)} className={`w-10 h-5 rounded-full transition-all ${dropShadow ? 'bg-neutral-400' : 'bg-neutral-700'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${dropShadow ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </button>
                        </div>

                        {dropShadow && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1">Blur: {shadowBlur}</label>
                                    <input type="range" min="0" max="40" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-neutral-400" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1">Offset: {shadowOffset}</label>
                                    <input type="range" min="0" max="20" value={shadowOffset} onChange={(e) => setShadowOffset(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-neutral-400" />
                                </div>
                            </div>
                        )}

                        {bgType === 'transparent' && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1">MC Stroke: {mcStroke}</label>
                                    <input type="range" min="0" max="30" value={mcStroke} onChange={(e) => setMcStroke(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-neutral-400" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1">Plateou Stroke: {plateouStroke}</label>
                                    <input type="range" min="0" max="20" value={plateouStroke} onChange={(e) => setPlateouStroke(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg cursor-pointer accent-neutral-400" />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setBgType('black')} className={`px-3 py-2 rounded-lg text-sm font-medium ${bgType === 'black' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}>Black</button>
                            <button onClick={() => setBgType('transparent')} className={`px-3 py-2 rounded-lg text-sm font-medium ${bgType === 'transparent' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'}`}>Transparent</button>
                        </div>

                        <button onClick={downloadLogo} className="w-full py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-all">Download PNG</button>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 w-full">
                            <h2 className="text-lg font-semibold text-neutral-200 mb-4 text-center">Preview</h2>
                            <div className="flex justify-center">
                                <div className="rounded-lg" style={{ background: bgType === 'transparent' ? 'repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 20px 20px' : 'transparent' }}>
                                    <canvas ref={canvasRef} className="rounded-lg max-w-full h-auto" style={{ width: '100%', maxWidth: '380px', aspectRatio: '1/1' }} />
                                </div>
                            </div>
                            <p className="text-neutral-600 text-sm text-center mt-4">512×512px</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <a href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    )
}
