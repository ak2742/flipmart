import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

export default function Account(props) {
    const { me } = props;

    document.title = "My Account"
    const dispatch = useDispatch()
    const history = useHistory()
    const { delAcc, editAcc, logoutCall } = bindActionCreators(uAC, dispatch)

    useEffect(() => {
        if (localStorage.getItem("MBtoken0") === null) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])

    const public_acc = () => {
        history.push(`/${me._id === "" ? "" : me._id}`)
    }
    const editMe = async () => {
        const image = await prompt("Image", "")
        const name = await prompt("Name", "")
        const desc = await prompt("Description", "")
        await editAcc(image, name, desc)
    }

    const logout = async () => {
        await logoutCall()
        history.push('/?src=logout')
    }
    const deleteAcc = async () => {
        const pwd = prompt("Enter your password")
        await delAcc({password: pwd})
        history.push('/?src=removeAcc')
    }
    return (
        <div className="container my-3 text-center">
            <div className="d-flex">
                <div className="my-3">
                    <img src={me.image === undefined ? "" : me.image} height="150px" width="150px" className="img-thumbnail" alt={me.name === undefined ? "" : me.name}></img>
                </div>
                <table className="table mx-3">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td><span role="button" onClick={public_acc}>{me._id === "" ? "" : me._id}</span></td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{me.name === undefined ? "" : me.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{me.email === undefined ? "" : me.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Role</th>
                            <td>{me.isBuyer ? " {Buyer} " : ""}{me.isSeller ? " {Seller} " : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row">Balance</th>
                            <td><p className="badge bg-primary">{me.balance === undefined ? "" : me.balance}</p></td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>{me.description === undefined ? "" : me.description}</td>
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


Account.defaultProps = {
    me: { _id: "" }
}

Account.propTypes = {
    me: PropTypes.object
}

