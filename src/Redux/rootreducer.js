// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reducer from './reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  reducer: reducer
})
