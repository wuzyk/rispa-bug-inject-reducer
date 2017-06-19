import firstReducer, { fetch as fetchFromFirst } from './redux/first'
import secondReducer, { fetch as fetchFromSecond } from './redux/second'

const registerModule = (store, when) => {
  store.injectReducer(firstReducer.key, firstReducer)

  store.dispatch(fetchFromFirst())

  setTimeout(() => {
    store.injectReducer(secondReducer.key, secondReducer)
    store.dispatch(fetchFromSecond())
  }, 5000)
}

export default registerModule
