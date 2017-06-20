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

  const reduxDevtoolCompose = !process.env.DISABLE_REDUX_DEVTOOLS
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
    : null

  const store = configureStore(
    history,
    window.RISPA_INITIAL_STATE,
    reduxDevtoolCompose,
  )
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

//
// disable react-devtools for production
//
/* eslint-disable no-underscore-dangle */
if (
  process.env.DISABLE_REACT_DEVTOOLS &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}
