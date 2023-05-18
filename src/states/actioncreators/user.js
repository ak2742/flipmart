const {delAccAPI} = require('../actions/user')

const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const signup = (image, name, email, password, isBuyer, isSeller, description) => {
  return (dispatch) => {
    dispatch(loaded("signup", { image, name, email, password, isBuyer, isSeller, description }))
  }
}

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loaded("login", { email, password }))
  }
}

export const myAcc = () => {
  return (dispatch) => {
    dispatch(loaded("myAcc", ""))
  }
}

export const findAcc = (id) => {
  return (dispatch) => {
    dispatch(loaded("findAcc", id))
  }
}

export const editAcc = (image, name, description) => {
  return (dispatch) => {
    dispatch(loaded("editAcc", { image, name, description }))
  }
}

export const logoutCall = () => {
  return (dispatch) => {
    dispatch(loaded("logout", ""))
  }
}

export const delAcc = (pwd) => {
  return (dispatch) => {
    return delAccAPI(pwd).then(arr =>
    dispatch(loaded("delAcc", arr)))
  }
}
