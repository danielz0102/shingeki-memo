import '@/styles/Card.css'
import cardSound from '@/assets/card-flip.mp3'

const audio = new Audio(cardSound)

function playSound() {
  audio.currentTime = 0
  audio.play()
}

export function Card({ character, onClick, flipped = false }) {
  function handleClick() {
    playSound()
    onClick(character)
  }

  return (
    <button
      className={`card ${flipped ? 'card--flipped' : ''}`}
      onClick={handleClick}
      disabled={flipped}
    >
      <div className="card__front">
        <div className="img-container">
          <img src={character.image} alt="" />
        </div>
        <span>{character.name}</span>
      </div>
      <div className="card__back"></div>
    </button>
  )
}
