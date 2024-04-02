const starWarsURL = 'https://www.swapi.tech/api/'

const SWApi = (endPoint) => {

  if (endPoint.startsWith('http')) {
    return fetch(endPoint)
      .then(res => res.json())
  }

  const lastCh = endPoint.slice(-1)

  if (!isNaN(lastCh)) {
    return fetch(`${starWarsURL}${endPoint}`)
      .then(res => res.json())

  } else {
    return fetch(`${starWarsURL}${endPoint}`)
      .then(res => res.json())
      .then(res => res.results);
  }
}

//function send res for getting details of episode , like planets
const getDataFromEpisode = async (obj) => {
  try {
    const data = await Promise.all(obj.map(async (url) => {
      const response = await fetch(url)
      const data = await response.json()
      return data.result.properties.name
    }))
    console.log(data)
    return data
  } catch (error) {
    console.error("Error fetching planet data:", error)
    return []
  }
}


export {SWApi, getDataFromEpisode}
