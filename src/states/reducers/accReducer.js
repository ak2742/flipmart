const initialState = {}

const reducer = async (state = initialState, action) => {
    if (action.payload === "OOPs!") { return state }
    else {
        if (action.type === "signup" || action.type === "login") {
            try {

                return localStorage.setItem("MBtoken0", action.payload.token)
            } catch (error) {
                console.log(error);
                return state
            }
        }

        if (action.type === "myAcc" || action.type === "editAcc") {
            try {

                return state = action.payload
            } catch (error) {
                console.log(error);
                return state
            }
        }

        if (action.type === "delAcc") {
            try {

                return localStorage.removeItem("MBtoken0")
            } catch (error) {
                console.log(error);
                return state
            }
        }

        else { return state }
    }
}

export default reducer