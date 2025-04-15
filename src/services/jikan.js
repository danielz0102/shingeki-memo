export async function getCharacters() {
  let data

  try {
    const response = await fetch(
      'https://api.jikan.moe/v4/anime/16498/characters',
    )

    if (!response.ok) {
      throw `${response.status} ${response.statusText}`
    }

    const json = await response.json()
    data = json.data
  } catch (error) {
    console.error('Error fetching characters:', error)
    return null
  }

  return data.map(({ character }) => ({
    id: character.mal_id,
    name: character.name.split(', ').reverse().join(' '),
    image: character.images.jpg.image_url,
    selected: false,
  }))
}
