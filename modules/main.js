//get new episodes id's
import {episodeMap} from './components.js'

const cssPromises = {}

//get container
const appContainer = document.getElementById('app')
//get url
const searchParams = new URLSearchParams(location.search)
//get id from url
const episodeId = searchParams.get('episodeId')
console.log(`${episodeId} what id i want to get`)

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


