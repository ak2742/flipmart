const host = `http://${process.env.REACT_APP_HOST}`
let token = localStorage.getItem("MBtoken0");
if (!token) {
     token = ""
}

const loadByIDAPI = async (id) => {
     try {
          const response = await fetch(`${host}/product/read/${id}`, {
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

const loadByUserAPI = async (id) => {
     try {
          const response = await fetch(`${host}/product/by/${id}`, {
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

const createNewAPI = async (params) => {
     try {
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
          console.log(error)
          return "OOPs!"
     }
}

const deleteOneAPI = async (id) => {
     try {
          const response = await fetch(`${host}/product/delete/${id}`, {
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

const editOneAPI = async (params) => {
     try {
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
          console.log(error)
          return "OOPs!"
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
          let arr = loadByIDAPI("all")
               .then(arr => arr.filter(item => item === findIn(item)))

          if (term === "") {
               return arr = loadByIDAPI("all")
          }
          return arr
     } catch (error) {
          console.log(error)
          return "OOPs!"
     }
}

module.exports = { loadByIDAPI, loadByUserAPI, createNewAPI, editOneAPI, deleteOneAPI, searchMeAPI }
