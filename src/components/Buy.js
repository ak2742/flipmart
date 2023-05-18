import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC } from '../states/index'
import { useHistory } from 'react-router'

export default function Buy() {
    document.title = "Buy Products | mBazaar"
    const history = useHistory()
    const dispatch = useDispatch()

    const { loadByUser } = bindActionCreators(pAC, dispatch)
    const { myAcc } = bindActionCreators(uAC, dispatch)

    const [me, setMe] = useState({ _id: "" })
    const [products, setProducts] = useState([{ _id: "" }])

    useSelector(state => state.myAcc).then(arr => { setMe(arr) })
    useSelector(state => state.prod).then(arr => { setProducts(arr) })

    const loadAll = () => {
        loadByUser("oth")
    }

    useEffect(() => {
        if (localStorage.getItem("MBtoken0")) {
            loadAll()
            myAcc()
        } else {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container my-3">
            <h2 className='text-center'>{products.length === 0 && "!!! Nothing to Buy !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    return <div className="col-md-3" key={product._id}> <Item usr={product.user} id={product._id} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} /> </div>
                })}
            </div>
        </div>
    )
}
