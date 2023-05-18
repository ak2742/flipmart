const apiCalls = require('../actions/user')
const loaded = (type, payload) => {
  return {
    type,
    payload
  }
}

export const signup = (image, name, email, password, isBuyer, isSeller, description) => {
  return (dispatch) => {
    return apiCalls.signupAPI({ image, name, email, password, isBuyer, isSeller, description }).then(rtrn =>
      dispatch(loaded("signup", rtrn)))
  }
}

export const login = (email, password) => {
  return (dispatch) => {
    return apiCalls.loginAPI({ email, password }).then(rtrn =>
      dispatch(loaded("login", rtrn)))
  }
}

export const myAcc = () => {
  return (dispatch) => {
    return apiCalls.myAccAPI().then(rtrn =>
      dispatch(loaded("myAcc", rtrn)))
  }
}

export const findAcc = (id) => {
  return (dispatch) => {
    return apiCalls.findAccAPI(id).then(rtrn =>
      dispatch(loaded("findAcc", rtrn)))
  }
}

export const editAcc = (image, name, description) => {
  return (dispatch) => {
    return apiCalls.editAccAPI({ image, name, description }).then(rtrn =>
      dispatch(loaded("editAcc", rtrn)))
  }
}

export const delAcc = (pwd) => {
  return (dispatch) => {
    return apiCalls.delAccAPI({ password: pwd }).then(rtrn =>
      dispatch(loaded("delAcc", rtrn)))
  }
}
