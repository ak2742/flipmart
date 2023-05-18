const apis = require('../actions/user')

const initialState = localStorage.getItem("MBtoken0")

const reducer = async (state = initialState, action) => {
    if (action.type === "signup") {
        try {
            let a = await apis.signupAPI(action.payload)
            if (a.token !== undefined) {

                return state = a.token
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

    if (action.type === "login") {
        try {
            let a = await apis.loginAPI(action.payload)
            if (a.token !== undefined) {

                return state = a.token
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

            return state = null
        } catch (error) {
            alert(error);
            return state
        }
    }

    if (action.type === "delAcc") {
        try {
            let a = action.payload
            if (a.error === undefined) {
                return state = null
            } else {
                return state
            }
        } catch (error) {
            alert(error);
            return state
        }
    }

    else { return state }

}

export default reducer