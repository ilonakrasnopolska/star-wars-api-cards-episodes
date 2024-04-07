//get load resource function
import {lazyLoadById} from './serverApi.js'

lazyLoadById()

window.addEventListener('popstate', () => {
  lazyLoadById()
})




