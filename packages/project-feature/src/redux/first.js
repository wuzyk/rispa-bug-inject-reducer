import { fetchGenerator } from '@rispa/redux'

const {
  reducer,
  fetch,
} = fetchGenerator({
  name: 'first',
  api: () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'first' }), 2000)
  }),
})

export {
  fetch,
}

export default reducer
