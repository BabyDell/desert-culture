'use client'
import WordleGame from "./wordle-game"

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">Wordle</h1>
      <WordleGame />
    </main>
  )
}

