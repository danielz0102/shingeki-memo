import { shuffle } from '@/utils'
import { getCharacters } from '@/services/jikan'
import { useEffect, useState } from 'react'

const allCharacters = await getCharacters()

export function useCharacters(max, score) {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    if (score === 0) {
      setCharacters(shuffle(allCharacters, max))
    }
  }, [max, score])

  return [characters, setCharacters]
}
