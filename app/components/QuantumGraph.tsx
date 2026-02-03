'use client'

import { useEffect, useRef } from 'react'

export default function QuantumGraph() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = window.innerWidth
        let height = window.innerHeight

        canvas.width = width
        canvas.height = height

        // Particles
        const particleCount = 100
        const connectionDistance = 150
        const particles: { x: number; y: number; vx: number; vy: number }[] = []

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Background gradient - Transparent/White for Industrial look
            ctx.clearRect(0, 0, width, height)
            // No fillRect needed if we want transparent, or white:
            // ctx.fillStyle = '#ffffff' 
            // ctx.fillRect(0, 0, width, height)

            // Update & Draw Particles
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            particles.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
                ctx.fill()

                // Connections
                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        ctx.strokeStyle = `rgba(0, 0, 0, ${1 - dist / connectionDistance})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
