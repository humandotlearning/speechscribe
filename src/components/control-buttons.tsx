"use client"

import { Button } from "@/components/ui/button"
import { Trash, Copy, Edit } from "lucide-react"

interface ControlButtonsProps {
  transcript: string
  clearTranscript: () => void
  copyTranscript: () => void
}

export default function ControlButtons({ transcript, clearTranscript, copyTranscript }: ControlButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={clearTranscript}
        disabled={!transcript}
        aria-label="Clear transcript"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Trash className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyTranscript}
        disabled={!transcript}
        aria-label="Copy transcript"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={!transcript}
        aria-label="Edit transcript"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  )
}

