const initialState = []

const reducer = (state = initialState, action) => {
    if (action.payload?.error !== undefined) {
        return state
    } else {
        switch (action.type) {
            case "findAcc":
                return state = [action.payload]

            default:
                return state;
        }
    }
}

export default reducer