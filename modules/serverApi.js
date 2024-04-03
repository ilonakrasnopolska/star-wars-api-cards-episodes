//empty obj for saving old request data from server
import {appContainer, episodeId, episodeMap} from "./helpers.js";

const cache = {}

//empty obj for saving css file if we loaded it before
const cssPromises = {}

//function for loading modules , css files and get data from API
function loadResource(src) {
  //js module
  if (src.endsWith('.js')) {
    return import(src);
  }
  //css file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = src
      cssPromises[src] =  new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      })
      document.head.append(link)
    }
    return cssPromises[src]
  }
  //data from server
  return fetch(src).then(res => res.json())
}

function renderPage (moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {

      appContainer.innerHTML = ''
      appContainer.append(pageModule.render(data.result))
      console.log(data.result)
    })
}

const renderPageByClick = () => {
  console.log(episodeId)
  if (episodeId) {
    //try to find the righter id
    const mappedEpisodeId = episodeMap[parseInt(episodeId)]
    console.log(`${mappedEpisodeId} id what i try to get`)
    if (mappedEpisodeId) {
      //load more info about product
      renderPage(
        './visualPart/episode-details.js',
        `https://swapi.tech/api/films/${mappedEpisodeId}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
      )
    } else {
      console.error(`No mapped episode found for episodeId: ${episodeId}`)
    }
  } else {
    renderPage(
      './visualPart/episode-list.js',
      'https://swapi.tech/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    )
  }
};

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

//function with conditions if we got data not send request again
async function getDataFromEpisodeWithCache(objName) {
  if (cache[objName]) {
    return cache[objName]
  } else {
    let data = await getDataFromEpisode(objName)
    cache[objName] = data
    return data
  }
}

export {loadResource, getDataFromEpisodeWithCache, renderPage, renderPageByClick}
