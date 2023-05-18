const apis = require('../actions/user')
const initialState = { _id: "" }

const reducer = async (state = initialState, action) => {

    if (action.type === "myAcc") {
        try {
            let a = await apis.myAccAPI()
            if (a.error === undefined) {
                return state = a
            } else {
                alert(a.error)
                console.clear()
                return state
            }
        } catch (error) {
            alert(error)
            return state
        }
    }

    if (action.type === "editAcc") {
        try {
            let a = await apis.editAccAPI(action.payload)
            if (a.error === undefined) {
                return state = a
            } else {
                alert(a.error)
                console.clear()
                return state
            }
        } catch (error) {
            alert(error)
            return state
        }
    }

    if (action.type === "logout") {
        try {

            return state = initialState
        } catch (error) {
            alert(error)
            return state
        }
    }

    if (action.type === "delAcc") {
        try {
            let a = action.payload
            if (a.error === undefined) {
                return state = initialState
            } else {
                alert(a.error)
                console.clear()
                return state
            }
        } catch (error) {
            alert(error)
            return state
        }
    }

    else { return state }
}

export default reducer