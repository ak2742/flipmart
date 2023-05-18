import { combineReducers } from 'redux'
import userReducer from './userReducer'
import prodReducer from './prodReducer'
import cartReducer from './cartReducer'
import accReducer from './accReducer'

const reducers = combineReducers({
  user: userReducer,
  prod: prodReducer,
  cart: cartReducer,
  myAcc: accReducer,
})
export default reducers