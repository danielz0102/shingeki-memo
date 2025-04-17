import '@/styles/Game.css'
import { shuffle } from '@/utils'
import { MAX_SCORE } from '@/constants'
import winSound from '@/assets/sounds/win.mp3'

import { Card } from './Card'
import { GameHeader } from './GameHeader'
import { VolumeIcon } from './icons'

import { useCharacters } from '@/hooks'
import { useState, useRef } from 'react'

const winAudio = new Audio(winSound)
winAudio.volume = 0.1

export function Game({ back }) {
  const [characters, setCharacters, score] = useCharacters(MAX_SCORE)
  const [bestScore, setBestScore] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [failed, setFailed] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const winDialog = useRef(null)

  const win = score === MAX_SCORE

  if (score > bestScore) {
    setBestScore(score)
  }

  if (win) {
    if (soundOn) {
      winAudio.currentTime = 0
      winAudio.play()
    }

    winDialog.current.showModal()
    reset()
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

  function handleClickModal() {
    winDialog.current.close()
    winAudio.pause()
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
      <dialog ref={winDialog} onClick={handleClickModal}>
        <form method="dialog">
          <h2>You win</h2>
          <button autoFocus>Close</button>
        </form>
      </dialog>
    </>
  )
}
