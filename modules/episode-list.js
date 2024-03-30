import {
  createDiv,
  createTitle,
  createList,
  createItem,
  createLink,
  createParagraph,
  createImage
} from './html-elements.js'

export function render(data) {
  console.log(data)
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
    const image = createImage('card-image-top')
    const cardBody = createDiv('card-body')
    const episodeNumber = createParagraph('card-text')
    const title = createTitle('h1','card-title')
    const detailsButton = createLink('btn')

    //add styles and class name
    episodeCard.style.width = '18%'
    episodeCard.classList.add('my-2')
    detailsButton.classList.add('btn-primary')

    //add content
    image.src = properties.image
    image.alt = properties.title
    episodeNumber.textContent = properties.episode_id
    title.textContent = properties.title
    detailsButton.textContent = 'More info'
    detailsButton.href = `?productId=${product.id}`


    //append all
    episodeCard.append(image, cardBody)
    cardBody.append(episodeNumber, title, detailsButton)

    container.append(episodeCard)

  }
  return container
}
