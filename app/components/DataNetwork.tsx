'use client'

import { useEffect, useRef } from 'react'

export default function DataNetwork() {
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

        const rows = 15
        const cols = 25
        const spacing = 60
        let time = 0

        const render = () => {
            time += 0.005
            ctx.clearRect(0, 0, width, height) // Transparent background

            const centerX = width / 2
            const centerY = height / 2

            // Draw Grid
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = (i - cols / 2) * spacing
                    const y = (j - rows / 2) * spacing

                    // 3D Rotation Effect
                    const rotatedX = x * Math.cos(time) - y * Math.sin(time)
                    const rotatedY = x * Math.sin(time) + y * Math.cos(time)

                    // Perspective
                    const scale = 200 / (200 - rotatedY * 0.1) // Fake depth
                    const screenX = centerX + rotatedX * scale
                    const screenY = centerY + rotatedY * scale * 0.5 // Flattened perspective

                    const size = Math.max(0, 2 * scale)
                    const opacity = Math.min(Math.max((scale - 0.5), 0), 1)

                    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})` // Black dots
                    ctx.beginPath()
                    ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
                    ctx.fill()

                    // Vertical lines
                    if (j > 0) {
                        // Simple lines just to show structure (connecting to previous row point would require storing state, simplification for MVP)
                    }
                }
            }

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
