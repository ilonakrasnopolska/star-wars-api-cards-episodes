//get load resource function
import {renderPageByClick} from './serverApi.js'

window.addEventListener('popstate', () => {
  renderPageByClick()
})

renderPageByClick()


