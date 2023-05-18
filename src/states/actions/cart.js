const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("MBtoken0");
if (!token) {
     token = ""
}

const readCartAPI = async () => {
     try {
          const response = await fetch(`${host}/cart`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const listInCartAPI = async (id) => {
     try {
          const response = await fetch(`${host}/cart/add/${id}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const orderItemAPI = async (id) => {
     try {
          const response = await fetch(`${host}/cart/order/${id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          const res = await response.json()

          return [id, res]
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const uncartItemAPI = async (id) => {
     try {
          const response = await fetch(`${host}/cart/remove/${id}`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          const res = await response.json()
          return [id, res]
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

module.exports = { listInCartAPI, readCartAPI, orderItemAPI, uncartItemAPI }
