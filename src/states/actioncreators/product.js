const apiCalls = require('../actions/prod')
const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const loadByID = (id) => {
  return (dispatch) => {
    return apiCalls.loadByIDAPI(id).then(rtrn =>
      dispatch(loaded("loadByID", rtrn)))
  }
}

export const loadByUser = (id) => {
  return (dispatch) => {
    return apiCalls.loadByUserAPI(id).then(rtrn =>
      dispatch(loaded("loadByUser", rtrn)))
  }
}

export const loadByUserAuth = (id) => {
  return (dispatch) => {
    return apiCalls.loadByUserAuthAPI(id).then(rtrn =>
      dispatch(loaded("loadByUser", rtrn)))
  }
}

export const createNew = (image, title, description, category, price) => {
  return (dispatch) => {
    return apiCalls.createNewAPI({ image, title, description, category, price }).then(rtrn =>
      dispatch(loaded("createNew", rtrn)))
  }
}

export const deleteOne = (id) => {
  return (dispatch) => {
    return apiCalls.deleteOneAPI(id).then(rtrn =>
      dispatch(loaded("deleteOne", rtrn)))
  }
}

export const editOne = (id, image, title, description, category, price) => {
  return (dispatch) => {
    return apiCalls.editOneAPI({ id, image, title, description, category, price }).then(rtrn =>
      dispatch(loaded("editOne", rtrn)))
  }
}

export const searchMe = (term) => {
  return (dispatch) => {
    return apiCalls.searchMeAPI(term).then(rtrn =>
      dispatch(loaded("loadByID", rtrn)))
  }
}
