import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {
  Provider,
  ConnectedRouter,
  configureStore,
  createWhen,
} from '@rispa/redux'
import { CookiesProvider } from '@rispa/vendor/cookies'
import createHistory from 'history/createBrowserHistory'
import routes from '@rispa/routes'

const startApp = () => {
  const history = createHistory()
  const store = configureStore(history, window.RISPA_INITIAL_STATE)
  const when = createWhen(store, window.RISPA_INITIAL_STATE)

  const render = getRoutes => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <CookiesProvider>
            <ConnectedRouter history={history}>
              {getRoutes(store, when)}
            </ConnectedRouter>
          </CookiesProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    )
  }

  render(routes)

  if (module.hot) {
    module.hot.accept('@rispa/routes', () => {
      when.clear()
      const newRoutes = require('@rispa/routes') // eslint-disable-line global-require
      render(newRoutes)
    })
  }
}

window.startApp = startApp
