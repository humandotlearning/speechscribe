"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface MicrophoneButtonProps {
  isListening: boolean
  toggleListening: () => void
}

export default function MicrophoneButton({ isListening, toggleListening }: MicrophoneButtonProps) {
  return (
    <Button
      onClick={toggleListening}
      className={cn(
        "h-16 w-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105",
        isListening
          ? "bg-red-500 hover:bg-red-600 animate-pulse"
          : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
      )}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
      <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
    </Button>
  )
}

