import '@/styles/Card.css'
import cardSound from '@/assets/audio/card-flip.mp3'

const audio = new Audio(cardSound)

export function Card({ character, onClick, soundOn = true, flipped = false }) {
  function handleClick() {
    if (soundOn) {
      audio.play()
    }

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
