import fs from "fs"
import fetch from "node-fetch"

// This contains the official Wordle answer list (2,315 common 5-letter words)
const answersUrl =
  "https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/5d752e5f0702da315298a6bb5a771586d6ff445c/wordle-answers-alphabetical.txt"

// This contains the official Wordle allowed guesses (10,657 additional valid 5-letter words)
const allowedGuessesUrl =
  "https://gist.githubusercontent.com/cfreshman/cdcdf777450c5b5301e439061d29694c/raw/de1df631b45492e0974f7affe266ec36fed736eb/wordle-allowed-guesses.txt"

async function downloadWordleLists() {
  try {
    // Download answer words
    const answersResponse = await fetch(answersUrl)
    const answersText = await answersResponse.text()
    const answerWords = answersText.trim().split("\n")

    console.log(`Downloaded ${answerWords.length} answer words`)

    // Download allowed guess words
    const guessesResponse = await fetch(allowedGuessesUrl)
    const guessesText = await guessesResponse.text()
    const guessWords = guessesText.trim().split("\n")

    console.log(`Downloaded ${guessWords.length} additional allowed words`)

    // Combine both lists
    const allWords = [...answerWords, ...guessWords]
    console.log(`Total: ${allWords.length} five-letter words`)

    // Write to file
    fs.writeFileSync("wordle-words.json", JSON.stringify(allWords, null, 2))
    console.log("Word list saved to wordle-words.json")

    // Create a sample of the first 100 words to verify
    console.log("Sample of words:")
    console.log(allWords.slice(0, 20))
  } catch (error) {
    console.error("Error downloading word lists:", error)
  }
}

downloadWordleLists()

