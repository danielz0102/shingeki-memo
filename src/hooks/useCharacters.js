import { shuffle } from '@/utils/suffle'
import { getCharacters } from '@/services/jikan'
import { useEffect, useState } from 'react'

const allCharacters = await getCharacters()

export function useCharacters(max) {
  const [characters, setCharacters] = useState([])

  const score = characters.reduce(
    (acc, character) => acc + Number(character.selected),
    0,
  )

  useEffect(() => {
    if (score === 0) {
      setCharacters(shuffle(allCharacters, max))
    }
  }, [max, score])

  return [characters, setCharacters, score]
}
