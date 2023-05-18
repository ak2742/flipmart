import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

export default function Account() {
    document.title = "My Account"
    const dispatch = useDispatch()
    const { myAcc, delAcc, editAcc } = bindActionCreators(uAC, dispatch)
    const [usr, setUsr] = useState({})
    useSelector(state => state.myAcc).then(arr => { setUsr(arr) })
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem("MBtoken0")) {
            myAcc()
        } else {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])
    const public_acc = () => {
        history.push(`/users/${usr._id}`)
    }
    const editMe = async () => {
        const image = await prompt("Image", "")
        const name = await prompt("Name", "")
        const desc = await prompt("Description", "")
        editAcc(image, name, desc)
    }
    const logout = () => {
        localStorage.removeItem("MBtoken0");
        history.push('/')
    }
    const deleteAcc = () => {
        const password = prompt("Enter your password")
        delAcc(password)
        history.push('/')
    }
    return (
        <div className="container my-3 text-center">
            <div className="d-flex">
                <div className="my-3">
                    <img src={usr.image} height="150px" width="150px" className="img-thumbnail" alt={usr.name}></img>
                </div>
                <table className="table mx-3">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td><span role="button" onClick={public_acc}>{usr._id}</span></td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{usr.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{usr.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Role</th>
                            <td>{!usr.isBuyer ? "" : " {Buyer} "}{!usr.isSeller ? "" : " {Seller} "}</td>
                        </tr>
                        <tr>
                            <th scope="row">Balance</th>
                            <td><p className="badge bg-primary">{usr.balance}</p></td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>{usr.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary mx-5 my-1" onClick={public_acc}>Public View</button>
            <button className="btn btn-success mx-5 my-1" onClick={editMe}>Edit Account</button>
            <button className="btn btn-outline-success mx-5 my-1" onClick={logout}>LogOut</button>
            <button className="btn btn-danger mx-5 my-1" onClick={deleteAcc}>Delete Account</button>
        </div>
    )
}
