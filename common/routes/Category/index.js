if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'category',
    getComponents (location, cb) {
      require.ensure([
        './containers/CategoryPage',
        './reducer'
      ], (require) => {
        let CategoryPage = require('./containers/CategoryPage').default
        let categoryReducer = require('./reducer').default
        injectAsyncReducer(store, 'newsList', categoryReducer)
        cb(null, CategoryPage)
      })
    }
  }
}
