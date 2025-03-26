interface TranscriptDisplayProps {
  isListening: boolean
  transcriptParts: string[]
}

export default function TranscriptDisplay({ isListening, transcriptParts }: TranscriptDisplayProps) {
  return (
    <div className="min-h-[200px] mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-y-auto">
      {transcriptParts.length > 0 ? (
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          {transcriptParts.map((word, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          {isListening ? "Listening..." : "Press the microphone button to start speaking"}
        </p>
      )}
    </div>
  )
}

