const initialState = [{ _id: "" }]

const reducer = async (state = initialState, action) => {
     if (action.payload === "OOPs!") { return state }
     else {

          if (action.type === "readCart") {
               try {

                    return state = action.payload
               } catch (error) {
                    console.log(error);
                    return state
               }
          }

          if (action.type === "orderItem" || action.type === "uncartItem") {
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