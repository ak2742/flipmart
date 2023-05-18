
const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const loadByID = (id) => {
  return (dispatch) => {
    dispatch(loaded("loadByID", id))
  }
}

export const loadByUser = (id) => {
  return (dispatch) => {
    dispatch(loaded("loadByUser", id))
  }
}

export const loadByUserAuth = (id) => {
  return (dispatch) => {
    dispatch(loaded("loadByUserAuth", id))
  }
}

export const createNew = (image, title, description, category, price) => {
  return (dispatch) => {
    dispatch(loaded("createNew", { image, title, description, category, price }))
  }
}

export const deleteOne = (id) => {
  return (dispatch) => {
    dispatch(loaded("deleteOne", id))
  }
}

export const editOne = (id, image, title, description, category, price) => {
  return (dispatch) => {
    dispatch(loaded("editOne", { id, image, title, description, category, price }))
  }
}

export const searchMe = (term) => {
  return (dispatch) => {
    dispatch(loaded("search", term))
  }
}
