//get func for creating html elements
import {
  createDiv,
  createTitle,
  createLink,
  createParagraph,
  createImage, createList, createItem
} from '../html-elements.js'

//get array of images with link
import {getHomeURL, getImageUrl, handleClickToBtn} from '/modules/helpers.js'

//get func for getting data from API
import {getDataFromEpisodeWithCache} from "/modules/serverApi.js"

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
  backButton.classList.add('btn-outline-secondary')
  backButton.href = getHomeURL()
  episodeCard.style.width = '40%'

  //add text content
  title.textContent = `Part${data.properties.episode_id} ${data.properties.title}`
  description.textContent = `${data.properties.opening_crawl}`
  backButton.textContent = 'Back to episodes'

  //add event listener to button
  handleClickToBtn(backButton)

  cardBody.append(title, description, backButton)
  episodeCard.append(image, cardBody)
  container.append(episodeCard)
}

//create function of creating list of components from episode
function createDetailsList(subtitle, data, listBox) {
  const wrapper = createDiv('card-body')
  const list = createList('card-list')
  const title = createTitle('h2', 'card-title', subtitle)

  for (const item of data) {
    let li = createItem('card-item')
    li.textContent = item
    list.append(li)
  }

  wrapper.append(title, list)
  listBox.append(wrapper)
}

//load episode details
async function loadEpisodeData(data, container, listBox) {
  try {
    const planets = await getDataFromEpisodeWithCache(data.properties.planets)
    const species = await getDataFromEpisodeWithCache(data.properties.species)
    const starships = await getDataFromEpisodeWithCache(data.properties.starships)

    const result = {
      planets,
      species,
      starships
    }

    const requests = Object.keys(result).map(key => {
      return createDetailsList(key, result[key], listBox)
    })

    await Promise.all(requests)

    //create episode card
    createEpisodeCard(data, container)
    container.append(listBox)
  } catch (error) {
    console.error("Error loading content:", error)
  }
}

//render page
export async function render(data) {
  const container = createDiv('container')
  const listBox = createDiv('card')

  //styles
  container.classList.add(
    'd-flex',
    'justify-content-between',
    'flex-wrap'
  )
  listBox.classList.add('p-4')
  listBox.style.width = '40%'

  //load content
  await loadEpisodeData(data, container, listBox)

  return container
}
