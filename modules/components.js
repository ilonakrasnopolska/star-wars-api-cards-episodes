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

export {
  episodeMap,
  imgArrSW,
  getHomeURL,
  getImageUrl
}
