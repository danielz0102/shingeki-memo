import '@/styles/Landing.css'
import snkLogo from '@/assets/snk-logo.png'

export function Landing({ play }) {
  function handleClick(event) {
    event.preventDefault()
    play()
  }

  return (
    <>
      <header id="landingHeader">
        <img className="logo" src={snkLogo} alt="Attack on Titan" />
        <h1>Memory Card Game</h1>
      </header>
      <main id="landingMain">
        <a href="#" id="playBtn" onClick={handleClick}>
          Play
        </a>
      </main>
    </>
  )
}
