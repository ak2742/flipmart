import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { cAC } from '../states/index'
import Cartitem from './CartItem'

export default function Cart() {
    document.title = "My Cart"
    const history = useHistory()
    const dispatch = useDispatch()
    const { readCart } = bindActionCreators(cAC, dispatch)

    useEffect(() => {
        if (localStorage.getItem('MBtoken0')) {
            readCart()
        } else {
            history.push('/')
        }
        // eslint-disable-next-line   
    }, [])

    const [myCart, setMyCart] = useState([])
    useSelector(state => state.cart).then(arr => { setMyCart(arr) })

    return (
        <div className="container my-3">
            <h2 className='text-center'>{myCart.length === 0 && "!!! Nothing in Cart !!!"}</h2>
            <ul className="list-group">
                {myCart.map((item) => {
                    return <Cartitem key={item._id} ID={item._id} title={item.title} description={item.description} by={item.user} />
                })}
            </ul>
        </div>
    )
}
