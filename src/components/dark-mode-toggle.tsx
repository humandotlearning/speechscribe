import { Toggle } from "@/components/ui/toggle"
import { Moon, Sun } from "lucide-react"

interface DarkModeToggleProps {
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
}

export default function DarkModeToggle({ isDarkMode, setIsDarkMode }: DarkModeToggleProps) {
  return (
    <Toggle aria-label="Toggle dark mode" pressed={isDarkMode} onPressedChange={setIsDarkMode} className="ml-auto">
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Toggle>
  )
}

