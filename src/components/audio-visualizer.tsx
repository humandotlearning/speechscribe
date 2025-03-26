"use client"

import { useRef, useEffect } from "react"

interface AudioVisualizerProps {
  isListening: boolean
  setupAudio: () => Promise<AnalyserNode | null>
}

export default function AudioVisualizer({ isListening, setupAudio }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const centerX = w / 2
    const centerY = h / 2
    const radius = Math.min(w, h) * 0.4

    let analyser: AnalyserNode | null = null
    let dataArray: Uint8Array

    const drawIdleCircle = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, w, h)

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)" // violet-500 with opacity
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw idle wave inside circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.clip()

      ctx.fillStyle = "rgba(139, 92, 246, 0.1)" // violet-500 with low opacity
      ctx.fillRect(0, 0, w, h)

      // Draw gentle wave
      const time = Date.now() / 1000
      ctx.beginPath()

      for (let x = 0; x < w; x += 1) {
        const y = centerY + Math.sin(x * 0.03 + time * 2) * 5
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.strokeStyle = "rgba(139, 92, 246, 0.8)" // violet-500
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()

      if (!isListening) {
        animationFrameRef.current = requestAnimationFrame(drawIdleCircle)
      }
    }

    const drawAudioCircle = () => {
      if (!ctx || !analyser) return

      analyser.getByteTimeDomainData(dataArray)

      ctx.clearRect(0, 0, w, h)

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(236, 72, 153, 0.5)" // pink-500 with opacity
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw audio visualization inside circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.clip()

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.2)") // violet-500
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.2)") // pink-500
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Draw waveform
      ctx.beginPath()

      const sliceWidth = w / dataArray.length

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * h) / 2

        if (i === 0) {
          ctx.moveTo(i * sliceWidth, y)
        } else {
          ctx.lineTo(i * sliceWidth, y)
        }
      }

      // Create gradient for the line
      const lineGradient = ctx.createLinearGradient(0, 0, w, 0)
      lineGradient.addColorStop(0, "rgba(139, 92, 246, 1)") // violet-500
      lineGradient.addColorStop(0.5, "rgba(168, 85, 247, 1)") // purple-500
      lineGradient.addColorStop(1, "rgba(236, 72, 153, 1)") // pink-500

      ctx.strokeStyle = lineGradient
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()

      if (isListening) {
        animationFrameRef.current = requestAnimationFrame(drawAudioCircle)
      }
    }

    const initializeVisualization = async () => {
      if (isListening) {
        analyser = await setupAudio()
        if (analyser) {
          const bufferLength = analyser.frequencyBinCount
          dataArray = new Uint8Array(bufferLength)
          drawAudioCircle()
        }
      } else {
        drawIdleCircle()
      }
    }

    initializeVisualization()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isListening, setupAudio])

  return (
    <div className="h-64 mb-8 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{ maxWidth: "400px" }} />
    </div>
  )
}

