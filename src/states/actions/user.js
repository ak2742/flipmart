const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("MBtoken0");

const tokenCall = () => {
     let lsToken = localStorage.getItem("MBtoken0");
     if (lsToken === undefined) {
          token = ""
     } else {
          token = lsToken
     }
}

const signupAPI = async (params) => {
     try {
          tokenCall()
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
          return {error: error}
     }
}

const loginAPI = async (params) => {
     try {
          tokenCall()
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
          return {error: error}
     }
}

const myAccAPI = async () => {
     try {
          tokenCall()
          const response = await fetch(`${host}/user/account`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          return {error: error}
     }
}

const findAccAPI = async (id) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/user/find/${id}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    "authToken": token
               },
          })
          return response.json()
     } catch (error) {
          return {error: error}
     }
}

const editAccAPI = async (params) => {
     try {
          tokenCall()
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
          return {error: error}
     }
}

const delAccAPI = async (pwd) => {
     try {
          tokenCall()
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
          return {error: error}
     }
}

module.exports = { signupAPI, loginAPI, myAccAPI, findAccAPI, editAccAPI, delAccAPI }
