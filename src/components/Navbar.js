import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'

export default function Navbar() {
    const history = useHistory()

    const [term, setTerm] = useState("")
    const upTerm = (event) => {
        setTerm(event.target.value)
    }
    const mSearch = () => {
        const searched = term
        if (searched === "") {
            history.push('/')
        } else {
            history.push(`/search?q=${encodeURI(searched)}`)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">mBazaar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/buy">Buy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/sell">Sell</Link>
                        </li>
                        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <input className="form-control me-2" type="search" id="searchInp" value={term} onChange={upTerm} placeholder="Search Products" aria-label="Search" />
                            <button className="btn btn-outline-success" onClick={mSearch}>Search</button>
                        </form>
                    </ul>
                    {!localStorage.getItem('MBtoken0') ? <form><Link to="/login" className="btn btn-outline-success mx-1 my-1">LogIn</Link>
                        <Link to="/join" className="btn btn-outline-success mx-1 my-1">SignUp</Link></form> :
                        <div className="d-flex"> <Link to="/my/cart"><i className="fas fa-shopping-cart xNav text-success"></i></Link>
                            <Link to="/my/account" className="btn btn-outline-success mx-1 my-1">My Account</Link></div>}
                </div>
            </div>
        </nav>
    )
}
