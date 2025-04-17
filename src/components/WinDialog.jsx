import winSound from '@/assets/sounds/win.mp3'

import { useRef } from 'react'

const winAudio = new Audio(winSound)
winAudio.volume = 0.1

export function WinDialog({ show, soundOn, onClose }) {
  const modal = useRef()

  if (show) {
    modal.current.showModal()
  }

  if (show && soundOn) {
    winAudio.currentTime = 0
    winAudio.play()
  }

  function close() {
    modal.current.close()
    winAudio.pause()
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
