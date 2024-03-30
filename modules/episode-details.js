import {
  createDiv
} from './html-elements.js'

export function render(data) {
  console.log(data)
  const container = createDiv('container')
  container.classList.add('py-4')
  container.innerHTML = `
    <a>Back to episodes</a>
    <h1>More info about product ${data.title}</h1>
    <img src="${data.category.image}" alt="${data.title}" style="max-width: 300px">
    <p class="lead">${data.description}</p>
    <p class="display-3">${data.price}</p>
    `
  return container
}
