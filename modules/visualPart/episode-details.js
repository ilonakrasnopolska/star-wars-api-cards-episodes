//get func for creating html elements
import {
  createDiv,
  createTitle,
  createLink,
  createParagraph,
  createImage
} from '../html-elements.js'

//get array of images with link
import {imgArrSW} from '/modules/components.js'

export function render(data) {
  console.log(data)
  const container = createDiv('container')
  const episodeCard = createDiv('card')
  const cardBody = createDiv('card-body')
  const title = createTitle('h1', 'card-title')
  const description = createParagraph('lead')
  const backButton = createLink('btn')

  //add styles and class name
  container.classList.add('py-4')
  episodeCard.classList.add('my-2', 'card')
  cardBody.classList.add('d-flex', 'justify-content-between', 'flex-column',)
  backButton.classList.add('btn-primary')
  episodeCard.style.width = '40%'

  //add text content
  title.textContent = `Part${data.properties.episode_id} ${data.properties.title}`
  description.textContent = `${data.properties.opening_crawl}`
  backButton.textContent = 'Back to episodes'

  container.append(episodeCard)
  episodeCard.append(cardBody)
  cardBody.append(title, description, backButton)

  return container
}
