import React, { useState, useEffect, useRef } from 'react'
import Chatbox from './Chatbox';
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { iAC } from '../states/index'

export default function Inbox(props) {
  const { socket, users, chats, me } = props;

  const dispatch = useDispatch()
  const history = useHistory()
  const { msgStatusMod } = bindActionCreators(iAC, dispatch)
  let mounted = useRef(false)

  const [userid, setUserid] = useState(new URLSearchParams(useLocation().search).get('m'))
  const [user, setUser] = useState({})

  const openUsr = async (id) => {
    userid !== id && setUserid(id)
    msgStatusMod({ user: id, status: "read" })
  }
  const updateUser = () => {
    let usr = users.filter(e => e._id === userid)
    if (usr.length === 0) {
      console.log("updateusr");
      setTimeout(() => {
        socket.emit("request-user-chat", { userID: userid })
      }, 1200);
    } else {
      document.title = usr[0].name
      if (!usr[0].new) {
        usr[0].new = 0
      }
      setUser(usr[0])
    }
  }

  useEffect(() => {
    mounted.current = true
    if (localStorage.getItem("auth") === null) {
      history.push('/')
    } else {
      msgStatusMod({ user: "", status: "recieved" })
      if (!userid) {
        document.title = "My Inbox"
      } else {
        openUsr(userid)
      }
    }
    socket.on('recieved-data', (data) => {
      console.log(data, "recievedib");
    })
    return () => {
      socket.removeAllListeners()
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updateUser()
    // eslint-disable-next-line
  }, [userid, users])

  return (
    <div className="d-flex">
      <div className="list-group border rounded m-1" style={{ "width": "21em" }}>
        {users.length === 0 ? <h4 className="text-center my-2">Start a chat</h4> : users.map((usr) => {
          return <div key={usr._id + usr.new} className={`list-group-item bg-gradient border ${usr.new === 0 ? "bg-secondary" : "bg-primary position-relative"}`} role="button" onClick={() => { openUsr(usr._id) }}>{usr.name}<span className={`badge bg-info rounded-pill end-0 mx-2 position-absolute ${usr.new === 0 && "d-none"}`}>{usr.new}</span></div>
        })}
      </div>

      {!userid ? <h1 className="text-center m-1" style={{ "width": "20em" }}>Welcome to your inbox</h1> :
        <Chatbox userid={userid} user={user} chats={chats} me={me} socket={socket} />}
    </div>
  )
}
