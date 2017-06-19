import { fetchGenerator } from '@rispa/redux'

const {
  reducer,
  fetch,
} = fetchGenerator({
  name: 'second',
  api: () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'second' }), 2000)
  }),
})

export {
  fetch,
}

export default reducer
