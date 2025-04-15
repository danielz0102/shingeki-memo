import '@/styles/App.css'
import video from '@/assets/background.webm'
import { Landing } from './Landing'
import { Game } from './Game'

import { useState } from 'react'

function App() {
  const [inGame, setInGame] = useState(false)
  return (
    <>
      {!inGame ? (
        <Landing play={() => setInGame(true)} />
      ) : (
        <Game back={() => setInGame(false)}></Game>
      )}
      <video src={video} muted loop autoPlay></video>
    </>
  )
}

export default App
