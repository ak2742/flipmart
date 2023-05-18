import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Navbar(props) {
    const { token, me } = props;

    const history = useHistory()

    const isTrue = (q) => {
        if (q === "isSeller") {
            if (me.isSeller) {
                return "active"
            } else {
                return "disabled"
            }
        }
        if (q === "isBuyer") {
            if (me.isBuyer) {
                return "active"
            } else {
                return "disabled"
            }
        }
        if (q === "haveCart") {
            if (me.isBuyer) {
                return ""
            } else {
                return "d-none"
            }
        }
        if (q === "verified") {
            if (me.verified) {
                return ""
            } else {
                return "d-none"
            }
        }
    }

    const [term, setTerm] = useState("")
    const upTerm = (event) => {
        setTerm(event.target.value)
    }
    const mSearch = (e) => {
        e.preventDefault()
        const spaceRemove = term.split(/[ ]+/)
        const searched = spaceRemove.join(" ")
        if (searched === "" || searched === " ") {
            history.push('/')
        } else {
            history.push(`/search?q=${encodeURI(searched)}`)
        }
    }
    return (
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg bg-gradient">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isTrue("isBuyer")}`} aria-current="page" to="/buy">Buy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isTrue("isSeller")}`} aria-current="page" to="/sell">Sell</Link>
                        </li>
                        <form className="d-flex" onSubmit={mSearch}>
                            <input className="form-control mx-2" type="search" value={term} onChange={upTerm} placeholder="Search Products" aria-label="Search" />
                            <button className="btn btn-danger" type="submit">Search</button>
                        </form>
                    </ul>
                    {token === null ? <form><Link to="/login" className="btn btn-danger mx-1 my-1">LogIn</Link>
                        <Link to="/join" className="btn btn-danger mx-1 my-1">SignUp</Link></form> :
                        <div className="d-flex">
                            <span className="btn btn-info disabled mx-1 my-1">balance: Rs {me.balance}</span>
                            <Link to="/my/cart" className={`${isTrue("haveCart")} mx-1`}><i className="fas fa-shopping-cart m-2 mb-0 text-warning" style={{ "fontSize": "180%" }}></i></Link>
                            <Link to="/my/account" className="btn btn-danger mx-1 my-1">My Account</Link></div>}
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    me: {},
    token: null,
}

Navbar.propTypes = {
    me: PropTypes.object,
    token: PropTypes.string,
}

