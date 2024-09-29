'use client'

import React, { useRef, useEffect } from 'react'

interface SparkleProps {
  id: string
  minSize: number
  maxSize: number
  particleDensity: number
  particleColor: string
  className?: string
}

export const SparklesCore: React.FC<SparkleProps> = ({
  id,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: { x: number; y: number; size: number; speed: number }[] = []

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        particle.y -= particle.speed
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }
      })
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [minSize, maxSize, particleDensity, particleColor])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
    />
  )
}