import '@/styles/Game.css'
import { shuffle } from '@/utils/suffle'
import { MAX_SCORE } from '@/constants'

import { Card } from './Card'
import { GameHeader } from './GameHeader'
import { VolumeIcon } from './icons'
import { WinDialog } from './WinDialog'

import { useCharacters } from '@/hooks/useCharacters'
import { useState } from 'react'

export function Game({ back }) {
  const [characters, setCharacters, score] = useCharacters(MAX_SCORE)
  const [bestScore, setBestScore] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [failed, setFailed] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  const win = score === MAX_SCORE

  if (score > bestScore) {
    setBestScore(score)
  }

  function handleCardClick(character) {
    setFlipped(true)

    setTimeout(() => {
      handleSelect(character)

      setTimeout(() => {
        setFlipped(false)
      }, 100)
    }, 500)
  }

  function handleSelect(character) {
    if (character.selected === true) {
      setFailed(true)
      reset()
    } else {
      selectCharacter(character.id)
    }
  }

  function reset() {
    const newCharacters = shuffle(characters)
    newCharacters.forEach((c) => (c.selected = false))

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
      <GameHeader
        failed={failed}
        setFailed={setFailed}
        score={score}
        bestScore={bestScore}
        back={back}
      />
      <main id="gameMain">
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            onClick={handleCardClick}
            flipped={flipped}
            soundOn={soundOn}
          />
        ))}
      </main>
      <footer id="gameFooter">
        <button className="sound-btn" onClick={() => setSoundOn(!soundOn)}>
          <VolumeIcon on={soundOn} />
        </button>
        <p>Don't click on any card more than once</p>
      </footer>
      <WinDialog show={win} soundOn={soundOn} onClose={reset} />
    </>
  )
}
