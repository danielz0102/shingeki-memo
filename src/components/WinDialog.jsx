import winSound from '@/assets/audio/win.mp3'
import { Song } from '@/utils/song'
import { useRef } from 'react'

const winSong = new Song(winSound, 0.5)

export function WinDialog({ show, soundOn, onClose }) {
  const modal = useRef()

  if (show) {
    modal.current.showModal()

    if (soundOn) {
      winSong.play(2000)
    }
  }

  function close() {
    modal.current.close()
    winSong.stop()
    onClose()
  }

  return (
    <dialog ref={modal} onClick={close}>
      <form method="dialog">
        <h2>You win</h2>
        <button autoFocus>Close</button>
      </form>
    </dialog>
  )
}
