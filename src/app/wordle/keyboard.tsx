"use client"

import { Button } from "@/components/ui/button"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  usedLetters: Record<string, "correct" | "present" | "absent" | undefined>
}

export default function Keyboard({ onKeyPress, usedLetters }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ]

  const getKeyClass = (key: string) => {
    if (key === "Enter" || key === "Backspace") {
      return "bg-gray-200 dark:bg-gray-700"
    }

    switch (usedLetters[key]) {
      case "correct":
        return "bg-green-500 text-white"
      case "present":
        return "bg-yellow-500 text-white"
      case "absent":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }

  return (
    <div className="w-full max-w-md">
      {rows.map((row, i) => (
        <div key={`row-${i}`} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${getKeyClass(key)} h-12 ${
                key === "Enter" || key === "Backspace" ? "px-2 text-xs" : "px-3 text-sm"
              } font-medium`}
              variant="ghost"
            >
              {key === "Backspace" ? "⌫" : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

