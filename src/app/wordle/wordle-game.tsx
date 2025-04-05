"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WORDS } from "@/lib/words"
import Keyboard from "./keyboard"

export default function WordleGame() {
  const [targetWord, setTargetWord] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [message, setMessage] = useState("")
  const [usedLetters, setUsedLetters] = useState<Record<string, "correct" | "present" | "absent" | undefined>>({})

  // Initialize the game
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setTargetWord(randomWord)
    setGuesses([])
    setCurrentGuess("")
    setGameStatus("playing")
    setMessage("")
    setUsedLetters({})
  }

  // Memoize submitGuess to avoid dependency issues
  const submitGuess = useCallback(() => {
    // Check if the guess is 5 letters
    if (currentGuess.length !== 5) {
      setMessage("Word must be 5 letters")
      setTimeout(() => setMessage(""), 2000)
      return
    }

    // Check if the word is in our word list
    if (!WORDS.includes(currentGuess)) {
      setMessage("Not in word list")
      setTimeout(() => setMessage(""), 2000)
      return
    }

    // Add the guess to the list of guesses
    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)

    // Update used letters
    const newUsedLetters = { ...usedLetters }
    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i]

      if (letter === targetWord[i]) {
        newUsedLetters[letter] = "correct"
      } else if (targetWord.includes(letter) && newUsedLetters[letter] !== "correct") {
        newUsedLetters[letter] = "present"
      } else if (!targetWord.includes(letter)) {
        newUsedLetters[letter] = "absent"
      }
    }
    setUsedLetters(newUsedLetters)

    // Check if the guess is correct
    if (currentGuess === targetWord) {
      setGameStatus("won")
      setMessage("You won!")
    } else if (newGuesses.length >= 6) {
      setGameStatus("lost")
      setMessage(`Game over! The word was ${targetWord}`)
    }

    // Reset the current guess
    setCurrentGuess("")
  }, [currentGuess, guesses, targetWord, usedLetters])

  // Use useCallback to memoize the handleKeyPress function
  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return

      if (key === "Enter") {
        submitGuess()
      } else if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toLowerCase())
      }
    },
    [currentGuess, gameStatus, submitGuess],
  )

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyPress])

  // Get the letter status for a specific position
  const getLetterStatus = (letter: string, position: number) => {
    if (!letter) return ""

    if (letter === targetWord[position]) {
      return "bg-green-500 text-white border-green-500"
    } else if (targetWord.includes(letter)) {
      return "bg-yellow-500 text-white border-yellow-500"
    } else {
      return "bg-gray-500 text-white border-gray-500"
    }
  }

  // Render empty rows for remaining guesses
  const renderEmptyRows = () => {
    const emptyRows = []
    for (let i = guesses.length; i < 6; i++) {
      const isCurrentRow = i === guesses.length
      const rowLetters = isCurrentRow ? currentGuess.padEnd(5, " ").split("") : Array(5).fill(" ")

      emptyRows.push(
        <div key={`row-${i}`} className="grid grid-cols-5 gap-2 mb-2">
          {rowLetters.map((letter, j) => (
            <div
              key={`cell-${i}-${j}`}
              className={`w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 ${
                letter !== " " && isCurrentRow
                  ? "border-gray-400 bg-white dark:bg-gray-700"
                  : "border-gray-300 bg-white dark:bg-gray-800"
              }`}
            >
              {letter !== " " ? letter.toUpperCase() : ""}
            </div>
          ))}
        </div>,
      )
    }
    return emptyRows
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      {message && (
        <Alert className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        {/* Render completed guesses */}
        {guesses.map((guess, i) => (
          <div key={`guess-${i}`} className="grid grid-cols-5 gap-2 mb-2">
            {guess.split("").map((letter, j) => (
              <div
                key={`letter-${i}-${j}`}
                className={`w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 transition-colors ${getLetterStatus(
                  letter,
                  j,
                )}`}
              >
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))}

        {/* Render empty rows */}
        {renderEmptyRows()}
      </div>

      <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />

      {gameStatus !== "playing" && (
        <Button onClick={startNewGame} className="mt-6">
          Play Again
        </Button>
      )}
    </div>
  )
}

