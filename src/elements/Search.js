import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Search(props) {
    const { me } = props;

    let mounted = useRef(false)

    const dispatch = useDispatch()

    let query = new URLSearchParams(useLocation().search).get('q')

    const { searchMe } = bindActionCreators(pAC, dispatch)

    let term = decodeURI(query).trim()
    const spaceRemove = term.split(/[ ]+/)
    term = spaceRemove.join(" ")

    const loadAll = () => {

        searchMe(term)
    }


    useEffect(() => {
        mounted.current = true
        if (term !== "" || term === " ") {
            document.title = `${term}`
            loadAll()
        } else {
            document.title = process.env.REACT_APP_NAME
            setProducts([])
        }
        return ()=>{mounted.current = false}
        // eslint-disable-next-line 
    }, [useLocation()])

    const [products, setProducts] = useState([])
    const update = (arr)=>{
        if (mounted.current && document.title === term) {
            setProducts(arr)
        }
    }
    useSelector(state=>state.prod).then(arr=>{update(arr)})

    return (
        <div className="container my-3">
            <h2 className='text-center'>{products.length === 0 && "!!! No Matches Found !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = product._id+product.title+product.description+product.price+product.image

                    return <Item key={key} id={product._id} usr={product.user} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </div>
    )
}

Search.defaultProps = {
    me: { _id: "" }
}

Search.propTypes = {
    me: PropTypes.object
}

