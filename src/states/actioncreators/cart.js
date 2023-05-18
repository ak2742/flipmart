const apiCalls = require('../actions/cart')
const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const listInCart = (id) => {
  return (dispatch) => {
    return apiCalls.listInCartAPI(id).then(rtrn =>
      dispatch(loaded("listInCart", rtrn)))
  }
}

export const readCart = () => {
  return (dispatch) => {
    return apiCalls.readCartAPI().then(rtrn =>
      dispatch(loaded("readCart", rtrn)))
  }
}

export const orderItem = (id) => {
  return (dispatch) => {
    return apiCalls.orderItemAPI(id).then(rtrn =>
      dispatch(loaded("orderItem", rtrn)))
  }
}

export const uncartItem = (id) => {
  return (dispatch) => {
    return apiCalls.uncartItemAPI(id).then(rtrn =>
      dispatch(loaded("uncartItem", rtrn)))
  }
}
