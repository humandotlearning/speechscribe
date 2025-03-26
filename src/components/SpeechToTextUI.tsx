"use client"

import { useState, useEffect, useRef } from "react"
import DarkModeToggle from "./dark-mode-toggle"
import AudioVisualizer from "./audio-visualizer"
import MicrophoneButton from "./microphone-button"
import TranscriptDisplay from "./transcript-display"
import ControlButtons from "./control-buttons"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"

export default function SpeechToTextUI() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [transcriptParts, setTranscriptParts] = useState<string[]>([])

  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneStreamRef = useRef<MediaStream | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const currentText = finalTranscript || interimTranscript
        setTranscript(currentText)

        // Animate text appearance by splitting into words
        if (currentText) {
          const words = currentText.trim().split(" ")
          setTranscriptParts(words)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isListening])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Setup audio context and analyzer
  const setupAudio = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      if (!microphoneStreamRef.current) {
        microphoneStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
      }

      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 1024
        const source = audioContextRef.current.createMediaStreamSource(microphoneStreamRef.current)
        source.connect(analyserRef.current)
      }

      return analyserRef.current
    } catch (error) {
      console.error("Error accessing microphone:", error)
      return null
    }
  }

  // Toggle listening state
  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false)
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current.getTracks().forEach((track) => track.stop())
        microphoneStreamRef.current = null
      }
    } else {
      setIsListening(true)
      setTranscript("")
      setTranscriptParts([])

      if (recognitionRef.current) {
        recognitionRef.current.start()
      }

      await setupAudio()
    }
  }

  // Clear transcript
  const clearTranscript = () => {
    setTranscript("")
    setTranscriptParts([])
  }

  // Copy transcript to clipboard
  const copyTranscript = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript)
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300",
        "bg-gray-50 dark:bg-gray-900",
      )}
    >
      <Card className="w-full max-w-2xl shadow-lg border-0 overflow-hidden bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Speech to Text</h1>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>

          <AudioVisualizer isListening={isListening} setupAudio={setupAudio} />

          <TranscriptDisplay isListening={isListening} transcriptParts={transcriptParts} />

          <div className="flex justify-between items-center">
            <ControlButtons transcript={transcript} clearTranscript={clearTranscript} copyTranscript={copyTranscript} />

            <MicrophoneButton isListening={isListening} toggleListening={toggleListening} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

