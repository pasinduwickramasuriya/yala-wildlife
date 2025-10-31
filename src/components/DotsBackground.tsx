'use client'

import { useEffect, useRef } from 'react'

/**
 * DotsBackground Component
 * Creates a static starfield background with dots using HTML5 Canvas
 * 
 * Why Canvas?
 * - No dependencies needed
 * - Super fast (60fps)
 * - Lightweight (<1KB)
 * - Zero performance impact
 */
export default function DotsBackground() {
  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Get the canvas element
    const canvas = canvasRef.current
    if (!canvas) return

    // Get the drawing context
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match window
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create array to store dot positions
    const dots: {
      x: number           // Horizontal position (0-100%)
      y: number           // Vertical position (0-100%)
      radius: number      // Size of the dot
      opacity: number     // Transparency (0-1)
    }[] = []

    // Generate random dots
    const numDots = 200 // Number of dots to create
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * canvas.width,        // Random X position
        y: Math.random() * canvas.height,       // Random Y position
        radius: Math.random() * 2,              // Size between 0-2px
        opacity: Math.random() * 0.5 + 0.3      // Brightness between 0.3-0.8
      })
    }

    // Draw background
    ctx.fillStyle = '#000000'  // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw each dot
    dots.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)  // Circle
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`  // White dot
      ctx.fill()
    })

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"  // Full screen, behind everything
    />
  )
}
