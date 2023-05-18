import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Home(props) {
    const { me, token } = props;

    document.title = process.env.REACT_APP_NAME
    const dispatch = useDispatch()
    const { loadByID } = bindActionCreators(pAC, dispatch)

    const loadAll = () => {
        loadByID("all")
    }
    
    let mounted = useRef(false)

    const [products, setProducts] = useState([])
    const update = (arr) => {
        if (mounted.current) {
            setProducts(arr)
        }
    }
    useSelector(state => state.prod).then(arr => { update(arr) })

    useEffect(() => {
        mounted.current = true
        loadAll()
        return ()=>{mounted.current = false}
        // eslint-disable-next-line 
    }, [products])

    return (
        <div className="container my-3">
            <h2 className='text-center'>{products.length === 0 && "!!! No Products Available !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = token+product._id+product.title+product.description+product.price+product.image

                    return <Item key={key} id={product._id} usr={product.user} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </div>
    )
}


Home.defaultProps = {
    me: { _id: "" },
    token: null
}

Home.propTypes = {
    me: PropTypes.object,
    token: PropTypes.string
}
