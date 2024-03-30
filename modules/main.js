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

const episodeId = searchParams.get('')
console.log(searchParams)

function renderPage (moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = ''
      appContainer.append(pageModule.render(data))
    })
}

if (episodeId) {
  //load more info about product
  renderPage(
    './episode-details.js',
    `https://api.escuelajs.co/api/v1/products/${episodeId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  )
} else {
  renderPage(
    './episode-list.js',
    'https://swapi.tech/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  )
}


