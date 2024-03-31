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
import {imgArrSW} from '/modules/components.js'

//create function for sorting data
export function sortData(data) {
  data.sort((a, b) => {
    const episodeA = parseInt(a.properties.episode_id)
    const episodeB = parseInt(b.properties.episode_id)
    return episodeA - episodeB
  })
}

export function render(data) {
  console.log(data)
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
  //current index of current img from imgArrSW
  let index = 0;

  //call func for sorting
  sortData(data)

  for (const episode of data) {
    //create elements
    const episodeCard = createItem('card')
    const image = createImage('card-image-top',
      `${imgArrSW[index]}`,
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

    //increase index
    index++
    if (index >= imgArrSW.length) {
      index = 0 // Вернуться к началу массива, если достигнут конец
    }

    //append all
    episodeCard.append(image, cardBody)
    cardBody.append(episodeNumber, title, detailsButton)

    container.append(episodeCard)
  }
  return container
}
