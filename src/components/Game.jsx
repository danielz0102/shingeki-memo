import '@/styles/Game.css'
import snkLogo from '@/assets/snk-logo.png'
import { useCharacters } from '@/hooks'
import { Card } from './Card'
import { shuffle } from '@/utils'
import { useState, useRef } from 'react'

const MAX_SCORE = 10

export function Game({ back }) {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [characters, setCharacters] = useCharacters(MAX_SCORE, score)
  const [flipped, setFlipped] = useState(false)
  const [maxScoreAchieved, setMaxScoreAchieved] = useState(false)
  const [failed, setFailed] = useState(false)
  const winDialog = useRef(null)

  const win = score === MAX_SCORE

  if (win) {
    winDialog.current.showModal()
    setMaxScoreAchieved(true)
    reset()
  }

  function backHome(event) {
    event.preventDefault()
    back()
  }

  function handleSelect(character) {
    setFlipped(true)

    setTimeout(() => {
      if (character.selected === true) {
        setFailed(true)
        reset()
      } else {
        selectCharacter(character.id)
        increaseScore()
      }

      setTimeout(() => {
        setFlipped(false)
      }, 100)
    }, 500)
  }

  function increaseScore() {
    const newScore = score + 1
    setScore(newScore)

    if (newScore > bestScore) {
      setBestScore(newScore)
    }
  }

  function reset() {
    const newCharacters = shuffle(characters)
    newCharacters.forEach((c) => (c.selected = false))

    setScore(0)
    setCharacters(newCharacters)
  }

  function selectCharacter(idSelected) {
    const newCharacters = shuffle(characters)
    const selectedIndex = newCharacters.findIndex((c) => c.id === idSelected)
    newCharacters[selectedIndex].selected = true

    setCharacters(newCharacters)
  }

  return (
    <>
      <header id="gameHeader">
        <a href="#" onClick={backHome}>
          <img className="logo" src={snkLogo} alt="Home" />
        </a>
        <div>
          <p
            className={failed ? 'failed' : ''}
            onAnimationEnd={() => setFailed(false)}
          >
            Score: {score}
          </p>
          <p className={maxScoreAchieved ? 'max-score' : ''}>
            {maxScoreAchieved
              ? `Max score achieved (${bestScore})`
              : `Best score: ${bestScore}`}
          </p>
        </div>
      </header>
      <main id="gameMain">
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            onClick={handleSelect}
            flipped={flipped}
          />
        ))}
        <dialog ref={winDialog} onClick={() => winDialog.current.close()}>
          <form method="dialog">
            <h2>You win</h2>
            <button autoFocus>Close</button>
          </form>
        </dialog>
      </main>
      <footer id="gameFooter">
        <p>Don't click on any card more than once</p>
      </footer>
    </>
  )
}
