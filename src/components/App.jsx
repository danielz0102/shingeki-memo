import '@/styles/App.css'
import video from '@/assets/background.webm'
import { Landing } from './Landing'

function App() {
  return (
    <>
      <Landing />
      <video src={video} muted loop autoPlay></video>
    </>
  )
}

export default App
