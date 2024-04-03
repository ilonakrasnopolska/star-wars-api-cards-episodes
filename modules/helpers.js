import {renderPageByClick} from '/modules/serverApi.js'

//get container
const appContainer = document.getElementById('app')

//create array for getting new array after sorting cards
let episodeCards = []

//get url
const searchParams = new URLSearchParams(location.search)
//get id from url
const episodeId = searchParams.get('episodeId')

//for changing id to the right id
const episodeMap = {
  1: 4, // IV
  2: 5, // V
  3: 6, // VI
  4: 1, // I
  5: 2, // II
  6: 3, // III
}

//array of images
const imgArrSW = [
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_3c1ff9eb.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg',
]

//function for get URL of main page
const getHomeURL = () => {

  //get obj of URL
  const homeHref = new URL(window.location.href)

  //return href and '/'
  return homeHref.origin + homeHref.pathname
}

// Функция для получения правильного URL изображения на основе episode_id
function getImageUrl(episodeId) {
  const mappedEpisodeId = episodeMap[episodeId]
  if (mappedEpisodeId) {
    // Используем mappedEpisodeId - 1, так как массивы в JavaScript индексируются с 0
    return imgArrSW[mappedEpisodeId - 1];
  } else {
    // Возвращаем заглушку или пустую строку, если episode_id не найден
    return ''; // или ссылка на заглушку изображения
  }
}

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

//create event listeners for button's
function handleClickToBtn(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    //get path to new page from button
    const href = e.target.getAttribute('href')
    // change URL current page without reboot
    history.pushState(null, '', href)

    // Вызываем логику перерисовки страницы
    renderPageByClick()

    console.log(href)
  })
}

export {
  appContainer,
  episodeCards,
  episodeId,
  episodeMap,
  imgArrSW,
  getHomeURL,
  getImageUrl,
  sortByEpisodeId,
  handleClickToBtn
}
