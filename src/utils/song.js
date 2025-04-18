export class Song {
  #audio
  #context
  #source
  #gainNode

  constructor(audioSrc, volume = 1) {
    this.#audio = new Audio(audioSrc)
    this.#audio.volume = volume

    this.#context = new AudioContext()
    this.#source = this.#context.createMediaElementSource(this.#audio)
    this.#gainNode = this.#context.createGain()

    this.#source.connect(this.#gainNode)
    this.#gainNode.connect(this.#context.destination)
  }

  play(duration = 1000) {
    this.#audio.currentTime = 0
    this.#gainNode.gain.setValueAtTime(0, this.#context.currentTime)
    this.#gainNode.gain.linearRampToValueAtTime(
      this.#audio.volume,
      this.#context.currentTime + duration / 1000,
    )

    this.#audio
      .play()
      .then(() => this.#context.resume())
      .catch(console.error)
  }

  stop(duration = 1000) {
    this.#gainNode.gain.linearRampToValueAtTime(
      0,
      this.#context.currentTime + duration / 1000,
    )

    setTimeout(() => {
      this.#audio.pause()
      this.#audio.currentTime = 0
    }, duration)
  }
}
