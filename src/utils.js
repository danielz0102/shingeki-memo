export function shuffle(arr, n = null) {
  const shuffled = structuredClone(arr)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return n ? shuffled.slice(0, n) : shuffled
}
