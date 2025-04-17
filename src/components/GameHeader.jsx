import '@/styles/GameHeader.css'
import snkLogo from '@/assets/images/snk-logo.png'
import { MAX_SCORE } from '@/constants'

export function GameHeader({ failed, setFailed, score, bestScore, back }) {
  const maxScoreAchieved = bestScore === MAX_SCORE

  function backHome(event) {
    event.preventDefault()
    back()
  }

  return (
    <header id="gameHeader">
      <a href="#" onClick={backHome}>
        <img className="logo" src={snkLogo} alt="Home" />
      </a>
      <div className="scoreboard">
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
  )
}
