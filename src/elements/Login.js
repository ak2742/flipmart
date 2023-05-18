import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

function Login() {
    document.title = "Login | mBazaar"
    const dispatch = useDispatch()
    const { login } = bindActionCreators(uAC, dispatch)
    useEffect(() => {
        if (localStorage.getItem("MBtoken0")) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])
    const history = useHistory()
    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = () => {
        try {
            login(credentials.email, credentials.password)
            history.push('/?src=login')
        } catch {
            alert('Something went wrong')
        }
    }

    return (
        <div className="container my-3">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" minLength="5" maxLength="35" title="Please enter a valid value" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" minLength="8" maxLength="18" title="Please enter a valid value" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="d-flex">
                <Link className="text-primary my-3" to="/join">Create a new account</Link>
            </div>
        </div>
    )
}

export default Login