const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("MBtoken0");
if (!token) {
     token = ""
}

const signupAPI = async (params) => {
     try {
          const response = await fetch(`${host}/user/join`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const loginAPI = async (params) => {
     try {
          const response = await fetch(`${host}/user/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const myAccAPI = async () => {
     try {
          const response = await fetch(`${host}/user/account`, {
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

const findAccAPI = async (id) => {
     try {
          const response = await fetch(`${host}/user/find/${id}`, {
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

const editAccAPI = async (params) => {
     try {
          const response = await fetch(`${host}/user/account/edit`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(params)
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

const delAccAPI = async (pwd) => {
     try {
          const response = await fetch(`${host}/user/account/delete`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
               body: JSON.stringify(pwd)
          })
          return response.json()
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

module.exports = { signupAPI, loginAPI, myAccAPI, findAccAPI, editAccAPI, delAccAPI }
