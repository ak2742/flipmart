const initialState = [{ _id: "" }]

const reducer = async (state = initialState, action) => {
    if (action.payload === "OOPs!") { return state }
    else {
        if (action.type === "loadByID" || action.type === "loadByUser") {
            try {

                return state = action.payload
            } catch (error) {
                console.log(error);
                return state
            }
        }

        if (action.type === "createNew" || action.type === "deleteOne" || action.type === "editOne") {
            try {

                return state
            } catch (error) {
                console.log(error);
                return state
            }
        }

        else { return state }
    }
}

export default reducer