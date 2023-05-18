const apis = require('../actions/order')
const initialState = [{ _id: "" }]

const reducer = async (state = initialState, action) => {
     if (action.type === "listInCart") {
          try {
               let a = await apis.listInCartAPI(action.payload)
               if (a.error === undefined) {
                    let b = await apis.readCartAPI()
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

     if (action.type === "uncartItem") {
          try {
               let a = await apis.uncartItemAPI(action.payload)
               if (a.error === undefined) {
                    let b = await apis.readCartAPI()
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

     if (action.type === "readCart") {
          try {
               let a = await apis.readCartAPI()
               if (a.error === undefined) {
                    return state = a
                } else {
                    alert(a.error)
                    console.clear()
                    return state
                }
          } catch (error) {
               console.log(error);
               return state
          }
     }

     if (action.type === "orderItem") {
          try {
               let a = await apis.orderItemAPI(action.payload)
               if (a.error === undefined) {
                    let b = await apis.readCartAPI()
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

     if (action.type === "logout" || "delAcc") {
          return state = initialState
     }

     else { return state }

}

export default reducer