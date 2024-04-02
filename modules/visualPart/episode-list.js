//get func for creating html elements
import {
  createDiv,
  createTitle,
  createList,
  createItem,
  createLink,
  createParagraph,
  createImage
} from '../html-elements.js'

//get array of images with link
import {getImageUrl} from '/modules/components.js'

//create array for getting new array after sorting
let episodeCards = []

//create func for sorting cards
function sortByEpisodeId(films) {
  films.sort((a, b) => {
    const episodeIdA =
      parseInt(a.querySelector('.card-text').textContent.replace('Part ', ''));
    const episodeIdB =
      parseInt(b.querySelector('.card-text').textContent.replace('Part ', ''));
    return episodeIdA - episodeIdB
  })
}

export function render(data) {
  //reset array of episode cards
  episodeCards.length = 0
  //get main container of app
  const appContainer = document.getElementById('app')
  //create main subtitle
  const subtitle = createTitle('h1', 'title', 'Welcome to Star Wars World!')
  subtitle.style.color = '#fff'
  appContainer.append(subtitle)

  //create ul element
  const container = createList('container')
  container.classList.add(
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  )

  for (const episode of data) {
    //create elements
    const episodeCard = createItem('card')
    const image = createImage('card-image-top',
      `${getImageUrl(episode.properties.episode_id)}`,
      `Episode ${episode.properties.episode_id}`)

    const cardBody = createDiv('card-body')
    const episodeNumber = createParagraph('card-text')
    const title = createTitle('h3','card-title')
    const detailsButton = createLink('btn')

    //add styles and class name
    cardBody.classList.add('d-flex', 'justify-content-between', 'flex-column')
    episodeCard.style.width = '30%'
    episodeCard.classList.add('my-2')
    episodeCard.style.flexShrink = '0'
    image.style.display = 'flex'
    image.style.flexBasis = '100%'
    episodeNumber.style.margin = '0'
    episodeNumber.style.fontSize = '20px'
    title.style.fontSize = '30px'
    detailsButton.classList.add('btn-primary')
    detailsButton.href = `?episodeId=${episode.properties.episode_id}/`

    //add text content
    episodeNumber.textContent = `Part ${episode.properties.episode_id}:`
    title.textContent = `${episode.properties.title}`
    detailsButton.textContent = `More info about episode ${episode.properties.episode_id}`

    //add event listener's
    // detailsButton.addEventListener('click', (e) => {
    //   e.preventDefault()
    // })


    //append all
    episodeCard.append(image, cardBody)
    cardBody.append(episodeNumber, title, detailsButton)

    //add card to array
    episodeCards.push(episodeCard)
  }

  // sort cards
  sortByEpisodeId(episodeCards)

  // add to container cards
  for (const episodeCard of episodeCards) {
    container.append(episodeCard)
  }
  return container
}
