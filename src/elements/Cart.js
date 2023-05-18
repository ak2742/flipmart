import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { cAC } from '../states/index'
import Cartitem from './CartItem'

export default function Cart(props) {
    const { me } = props;

    document.title = "My Cart"
    const history = useHistory()
    const dispatch = useDispatch()
    const { readCart } = bindActionCreators(cAC, dispatch)

    const loadAll = () => {
        readCart()
    }

    let mounted = useRef(false)

    const [myCart, setMyCart] = useState([])

    const updateCart = (arr) => {
        if (mounted.current && me.isBuyer) {
            setMyCart(arr)
        }
    }

    useSelector(state => state.cart).then(arr => { updateCart(arr) })

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("MBtoken0") !== null) {
            if (me.isBuyer) {
                loadAll()
            } else {
                history.push('/')
            }
        } else {
            history.push('/')
        }
        return ()=>{mounted.current = false}
        // eslint-disable-next-line   
    }, [myCart])

    return (
        <div className="container my-3">
            <h2 className='text-center'>{myCart.length === 0 && "!!! Nothing in Cart !!!"}</h2>
            <ul className="list-group">
                {myCart.map((item) => {
                    let key = item._id + item.title + item.description

                    return <Cartitem key={key} ID={item._id} title={item.title} description={item.description} by={item.user} />
                })}
            </ul>
        </div>
    )
}


Cart.defaultProps = {
    me: { _id: "" }
}

Cart.propTypes = {
    me: PropTypes.object
}

