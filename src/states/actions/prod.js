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

const loadByIDAPI = async (id) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/read/${id}`, {
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

const loadByUserAPI = async (id) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/by/0/${id}`, {
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

const loadByUserAuthAPI = async (id) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/by/1/${id}`, {
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

const createNewAPI = async (params) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/add`, {
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

const deleteOneAPI = async (id) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/delete/${id}`, {
               method: "DELETE",
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

const editOneAPI = async (params) => {
     try {
          tokenCall()
          const response = await fetch(`${host}/product/edit/${params.id}`, {
               method: "PUT",
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

const searchMeAPI = async (term) => {
     const spaceRemove = term.split(/[ ]+/)
     term = spaceRemove.join(" ")

     const findIn = (obj) => {
          if (obj.title.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || obj.description.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || obj.category.toUpperCase().indexOf(term.toUpperCase()) !== -1
               || JSON.stringify(obj.price) === term) {
               return obj
          }
     }
     try {
          if (term !== "") {
               let arr = loadByIDAPI("all")
                    .then(arr => arr.filter(item => item === findIn(item)))

               return arr
          } else {
               return {error: ''}
          }
     } catch (error) {
          return {error: error}
     }
}

module.exports = { loadByIDAPI, loadByUserAPI, loadByUserAuthAPI, createNewAPI, editOneAPI, deleteOneAPI, searchMeAPI }
