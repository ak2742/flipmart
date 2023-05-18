import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cAC } from '../states/index'

export default function Cartitem(props) {
    const { ID, title, description, by, load_fn } = props
    const dispatch = useDispatch()
    const { orderItem, uncartItem } = bindActionCreators(cAC, dispatch)

    const order2Get = () => {
        orderItem(ID)
        load_fn()
    }
    const uncartMe = () => {
        uncartItem(ID)
        load_fn()
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                <div className="my-2">{description}</div>
                <Link to={`/${by}/${ID}`} className="btn btn-sm btn-primary">Open</Link>
            </div>
            <span role="button" className="badge bg-success mx-2" onClick={order2Get}> GET this item <i className="fas fa-arrow-alt-circle-down"></i></span>
            <span role="button" className="badge bg-danger mx-2" onClick={uncartMe}> REMOVE from cart <i className="fas fa-cart-arrow-down"></i></span>
        </li>
    )
}
