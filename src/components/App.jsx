import '@/styles/App.css'
import videoSrc from '@/assets/videos/background.webm'

import { Landing } from './Landing'
import { Game } from './Game'

import { useState, useRef, useEffect } from 'react'

function App() {
  const [inGame, setInGame] = useState(false)
  const video = useRef()

  useEffect(() => {
    const videoElement = video.current
    videoElement.addEventListener('canplay', fadeInVideo)

    return () => {
      videoElement.removeEventListener('canplay', fadeInVideo)
    }
  }, [])

  function fadeInVideo() {
    video.current.style.opacity = '1'
  }

  return (
    <>
      {!inGame ? (
        <Landing play={() => setInGame(true)} />
      ) : (
        <Game back={() => setInGame(false)}></Game>
      )}
      <video
        ref={video}
        src={videoSrc}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      ></video>
    </>
  )
}

export default App
