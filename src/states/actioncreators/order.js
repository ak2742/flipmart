
const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const listInCart = (id) => {
  return (dispatch) => {
    dispatch(loaded("listInCart", id))
  }
}

export const readCart = () => {
  return (dispatch) => {
    dispatch(loaded("readCart", ""))
  }
}

export const orderItem = (id) => {
  return (dispatch) => {
    dispatch(loaded("orderItem", id))
  }
}

export const uncartItem = (id) => {
  return (dispatch) => {
    dispatch(loaded("uncartItem", id))
  }
}
