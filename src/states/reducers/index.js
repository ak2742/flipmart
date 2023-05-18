import { combineReducers } from 'redux'
import userReducer from './userReducer'
import prodReducer from './prodReducer'
import orderReducer from './orderReducer'
import accReducer from './accReducer'

const reducers = combineReducers({
  user: userReducer,
  prod: prodReducer,
  cart: orderReducer,
  myAcc: accReducer,
})
export default reducers