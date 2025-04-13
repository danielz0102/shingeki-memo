import '@/styles/App.css'
import video from '@/assets/background.webm'
import { Landing } from './Landing'
import { Card } from './Card'
import { getCharacters } from '@/services/jikan'
import { useState } from 'react'

const characters = await getCharacters()

function App() {
  const [inGame, setInGame] = useState(false)
  return (
    <>
      {!inGame ? (
        <Landing play={() => setInGame(true)} />
      ) : (
        <main className="game">
          <Card character={characters[0]} />
        </main>
      )}
      <video src={video} muted loop autoPlay></video>
    </>
  )
}

export default App
