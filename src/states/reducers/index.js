import { combineReducers } from 'redux'
import userReducer from './userReducer'
import prodReducer from './prodReducer'
import orderReducer from './orderReducer'
import accReducer from './accReducer'
import tokenReducer from './tokenReducer'

const reducers = combineReducers({
  token: tokenReducer,
  usr: userReducer,
  prod: prodReducer,
  cart: orderReducer,
  me:  accReducer,
})
export default reducers