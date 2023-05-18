import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC } from '../states/index'

export default function Home() {
    document.title = "mBazaar"
    const dispatch = useDispatch()
    const { loadByID } = bindActionCreators(pAC, dispatch)
    const { myAcc } = bindActionCreators(uAC, dispatch)

    const loadAll = () => {
        loadByID("all")
    }

    useEffect(() => {
        loadAll()
        if (localStorage.getItem('MBtoken0')) {
            myAcc()
        }
        // eslint-disable-next-line
    }, [useLocation()])


    const [me, setMe] = useState({})
    const [products, setProducts] = useState([])

    useSelector(state => state.me).then(arr => { setMe(arr) })
    useSelector(state => state.prod).then(arr => { setProducts(arr) })


    return (
        <div className="container my-3">
            <h2 className='text-center'>{products.length === 0 && "!!! No Products Available !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    return <div className="col-md-3" key={product._id}> <Item id={product._id} usr={product.user} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} /> </div>
                })}
            </div>
        </div>
    )
}
