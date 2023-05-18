const apis = require('../actions/prod')
const initialState = [{ _id: "" }]

const reducer = async (state = initialState, action) => {
    if (action.type === "loadByID") {
        try {
            let a = await apis.loadByIDAPI(action.payload)
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

    if (action.type === "loadByUser") {
        try {
            let a = await apis.loadByUserAPI(action.payload)
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

    if (action.type === "loadByUserAuth") {
        try {
            let a = await apis.loadByUserAuthAPI(action.payload)
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

    if (action.type === "createNew") {
        try {
            let a = await apis.createNewAPI(action.payload)
            if (a.error === undefined) {
                let b = await apis.loadByUserAuthAPI("me")
                if (b.error === undefined) {
                    return state = b
                } else {
                    alert(b.error)
                    console.clear()
                    return state
                }
            } else {
                alert(a.error)
                console.clear()
                return state
            }
        } catch (error) {
            alert(error);
            return state
        }
    }

    if (action.type === "editOne") {
        try {
            let a = await apis.editOneAPI(action.payload)
            if (a.error === undefined) {
                return state
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

    if (action.type === "deleteOne") {
        try {
            let a = await apis.deleteOneAPI(action.payload)
            if (a.error === undefined) {
                return state
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

    if (action.type === "search") {
        try {
            let a = await apis.searchMeAPI(action.payload)
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