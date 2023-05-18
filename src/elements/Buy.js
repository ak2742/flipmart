import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'
import { useHistory } from 'react-router'

export default function Buy(props) {
    const { me } = props;

    document.title = "Buy Products"
    const history = useHistory()
    const dispatch = useDispatch()
    const { loadByUserAuth } = bindActionCreators(pAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        loadByUserAuth("oth")
    }
    
    const [products, setProducts] = useState([])
    const update = (arr) => {
        if (mounted.current && me.isBuyer) {
            setProducts(arr)
        }
    }
    useSelector(state => state.prod).then(arr => { update(arr) })
    
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
    }, [products])

    return (
        <div className="container my-3">
            <h2 className='text-center'>{products.length === 0 && "!!! Nothing to Buy !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = product._id+product.title+product.description+product.price+product.image

                    return <Item key={key} usr={product.user} id={product._id} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </div>
    )
}


Buy.defaultProps = {
    me: { _id: "" }
}

Buy.propTypes = {
    me: PropTypes.object
}
