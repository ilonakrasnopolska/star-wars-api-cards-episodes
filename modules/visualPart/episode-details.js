//get func for creating html elements
import {
  createDiv,
  createTitle,
  createLink,
  createParagraph,
  createImage, createList, createItem
} from '../html-elements.js'

//get array of images with link
import {getHomeURL, getImageUrl} from '/modules/components.js'

//get func for getting data from API
import {getDataFromEpisode} from "/modules/serverApi.js"

//create function of creating episode card
function createEpisodeCard(data, container) {
  const episodeCard = createDiv('card')
  const image = createImage('card-image-top',
    `${getImageUrl(data.properties.episode_id)}`,
    `${data.properties.title}`)

  const cardBody = createDiv('card-body')
  const title = createTitle('h1', 'card-title')
  const description = createParagraph('lead')
  const backButton = createLink('btn')

  //add styles and class name
  container.classList.add('py-4')
  episodeCard.classList.add('my-2', 'card')
  cardBody.classList.add('d-flex', 'justify-content-between', 'flex-column',)
  backButton.classList.add('btn-primary')
  backButton.href = getHomeURL()
  episodeCard.style.width = '40%'

  //add text content
  title.textContent = `Part${data.properties.episode_id} ${data.properties.title}`
  description.textContent = `${data.properties.opening_crawl}`
  backButton.textContent = 'Back to episodes'

  cardBody.append(title, description, backButton)
  episodeCard.append(image, cardBody)
  container.append(episodeCard)
}

//create function of creating list of components from episode
function createDetailsList(subtitle, data, descrArray, listBox) {
  const list = createList('card-body')
  const title = createTitle('h2', 'card-title', subtitle)

  for (const item of descrArray) {
    console.log(item)
    let li = createItem()
    li.textContent = item
    list.append(li)
  }

  listBox.append(title, list)
}

async function renderDetailsList(data, container) {
  const [planets, species, starships] = await Promise.all([
    getDataFromEpisode(data.properties.planets),
    getDataFromEpisode(data.properties.species),
    getDataFromEpisode(data.properties.starships)
  ])

  const result = {
    planets,
    species,
    starships
  }

  const listBox = createDiv('card')
  listBox.style.width = '40%'

  for (let key in result) {
    createDetailsList(key, data, result[key], listBox);
  }

  container.append(listBox)
}

export function render(data) {
  console.log(`${data.properties.episode_id} what i get id of episode`)
  const container = createDiv('container')

  //styles
  container.classList.add(
    'd-flex',
    'justify-content-between',
    'flex-wrap'
  )

  //create planets list
  renderDetailsList(data, container)
  //create episode card
  createEpisodeCard(data, container)

  return container
}
