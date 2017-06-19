/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

import componentGenerator from './component'
import reduxGenerator from './redux'
import reduxModuleGenerator from './redux-module'
import featurePluginGenerator from './feature-plugin'

export default plop => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('redux', reduxGenerator)
  plop.setGenerator('redux-module', reduxModuleGenerator)
  plop.setGenerator('feature-plugin', featurePluginGenerator)
}
