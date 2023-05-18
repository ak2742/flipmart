import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { uAC, pAC } from '../states/index'

export default function User() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { loadByUser } = bindActionCreators(pAC, dispatch)
    const { findAcc, myAcc } = bindActionCreators(uAC, dispatch)
    const [usr, setUsr] = useState({})
    useSelector(state => state.user).then(arr => { setUsr(arr) })

    const [me, setMe] = useState({})
    useSelector(state => state.myAcc).then(arr => { setMe(arr) })

    const [products, setProducts] = useState([])
    useSelector(state => state.prod).then(arr => { setProducts(arr) })

    const loadAll = () => {
        loadByUser(id)
    }

    useEffect(() => {
        findAcc(id)
        loadAll()
        if (localStorage.getItem("MBtoken0")) {
            myAcc()
        }
        // eslint-disable-next-line
    }, [])
    if (usr.name !== "") {
        document.title = `${usr.name}`
    } else {
        document.title = "mBazaar"
    }
    return (
        <div className="container my-3">
            <div className="d-flex text-center">
                <div className="my-3">
                    <img src={usr.image} height="150px" width="150px" className="img-thumbnail" alt={usr.name}></img>
                </div>
                <table className="table mx-3">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td>{usr._id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{usr.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Role</th>
                            <td>{!usr.isBuyer ? "" : " {Buyer} "}{!usr.isSeller ? "" : " {Seller} "}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>{usr.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className='text-center'>{products.length === 0 && "!!! No products to show !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    return <div className="col-md-3" key={product._id}> <Item usr={product.user} id={product._id} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} /> </div>
                })}
            </div>
        </div>
    )
}
