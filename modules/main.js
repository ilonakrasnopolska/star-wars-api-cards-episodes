const cssPromises = {}

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

const appContainer = document.getElementById('app')
const searchParams = new URLSearchParams(location.search)

const episodeId = searchParams.get('episodeId')
console.log(episodeId)

function renderPage (moduleName, apiUrl, css) {
  console.log(`${moduleName} module`)
  console.log(`${apiUrl} api link`)
  console.log(`${css} css styles`)
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = ''
      appContainer.append(pageModule.render(data.result))
    })
}

if (episodeId) {
  //load more info about product
  renderPage(
    './visualPart/episode-details.js',
    `https://swapi.tech/api/films/${episodeId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  )
} else {
  renderPage(
    './visualPart/episode-list.js',
    'https://swapi.tech/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  )
}


