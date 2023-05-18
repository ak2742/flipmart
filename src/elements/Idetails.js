import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC, cAC } from '../states/index'

export default function Idetails() {
    const { userID, productID } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()
    const { loadByID, deleteOne, editOne } = bindActionCreators(pAC, dispatch)
    const { listInCart, orderItem, readCart } = bindActionCreators(cAC, dispatch)
    const { findAcc, myAcc } = bindActionCreators(uAC, dispatch)
    useEffect(() => {
        loadByID(productID)
        findAcc(userID)
        if (localStorage.getItem('MBtoken0')) {
            myAcc()
            readCart()
        }
        // eslint-disable-next-line
    }, [])

    const [item, setItem] = useState({})
    useSelector(state => state.prod).then(arr => { setItem(arr[0]) })

    const [usr, setUsr] = useState({})
    useSelector(state => state.user).then(arr => { setUsr(arr) })

    const [me, setMe] = useState({})
    useSelector(state => state.me).then(arr => { setMe(arr) })

    const [cart, setCart] = useState([])
    useSelector(state => state.cart).then(arr => { setCart(arr) })
 

    let my = false
    let in_cart = false
    if (userID === me._id) {
        my = true
    } else {
        cart.forEach(element => {
            if (element._id === productID) {
                in_cart = true
            }
        });
    }
    if (in_cart === true) {
        document.getElementById('addC').classList.add("d-none")
    }

    const editMe = async () => {
        const eImage = await prompt("Image", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        editOne(productID, eImage, eTitle, eDesc, eCtgry, ePrice)
        alert("updated successfully")
        loadByID(productID)
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            deleteOne(productID)
            history.push('/')
        }
    }
    const add2Cart = () => {
        listInCart(productID)
        document.getElementById('addC').classList.add('d-none')
    }
    const order2Get = () => {
        orderItem(productID)
        document.getElementById('addO').classList.add('d-none')
    }
    const goToUser = () => {
        history.push(`/${usr._id}`)
    }
    if (item.title !== "") {
        document.title = `${item.title} - ${usr.name}`
    } else {
        document.title = `mBazaar`
    }
    return (
        <div className="container">{usr.name === "" || item.title === "" ? <h2 className='text-center'>!!! Incorrect URL !!!</h2> :
            <div className="card my-5 mx-2">
                <img src={item.image} className="card-img-top" id='img_det' alt={item.title} />
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title"><strong>{item.title}</strong> by <strong role="button" onClick={goToUser}>{usr.name}</strong></h5>
                        {!my ?
                            <span role="button" id="addC"
                                className={localStorage.getItem('MBtoken0') ? "badge bg-success mx-2" : "d-none badge bg-success mx-2"}
                                onClick={add2Cart}> ADD to cart <i className="fas fa-cart-plus"></i></span> :
                            <i role="button" className="fas fa-edit mx-2" onClick={editMe} ></i>}
                        {!my ?
                            <span role="button" id="addO"
                                className={localStorage.getItem('MBtoken0') ? "badge bg-success mx-2" : "d-none badge bg-success mx-2"}
                                onClick={order2Get}> GET this item <i className="fas fa-arrow-alt-circle-down"></i></span> :
                            <i role="button" className="fas fa-trash mx-2" onClick={deleteMe} ></i>}
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted d-inline">{item.category}</h6>
                    <h6 className="card-subtitle mb-2 text-muted d-inline"> | Cost - INR {item.price} | </h6>
                    <h6 className="card-subtitle mb-2 text-muted d-inline">Sold - {item.sold}</h6>
                    <p className="card-text">{item.description}</p>

                </div>
            </div>}
        </div>
    )
}
