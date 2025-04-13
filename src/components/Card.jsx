import '@/styles/Card.css'
import { useState } from 'react'

export function Card({ character }) {
  const [flipped, setFlipped] = useState(false)

  function toggleFlip() {
    setFlipped(!flipped)
  }

  return (
    <button
      className={`card ${flipped ? 'card--flipped' : ''}`}
      onClick={toggleFlip}
    >
      <div className="card__front">
        <img src={character.image} alt="" />
        {character.name}
      </div>
      <div className="card__back"></div>
    </button>
  )
}
