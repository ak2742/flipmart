const initialState = {}

const reducer = async (state = initialState, action) => {
    if (action.payload === "OOPs!") { return state }

    else if (action.type === "findAcc") {
        try {

            return state = action.payload
        } catch (error) {
            console.log(error);
            return state
        }
    }

    else { return state }
}

export default reducer