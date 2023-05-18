const apis = require('../actions/user')
const initialState = { _id: "" }

const reducer = async (state = initialState, action) => {
    if (action.type === "findAcc") {
        try {
            let a = await apis.findAccAPI(action.payload)
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

    else { return state }
}

export default reducer