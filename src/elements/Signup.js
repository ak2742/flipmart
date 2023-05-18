import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

function Signup() {
    document.title = "Signup | mBazaar"
    const dispatch = useDispatch()
    const { signup } = bindActionCreators(uAC, dispatch)
    const history = useHistory()
    const [credentials, setCredentials] = useState({
        image: "", name: "", email: "", password: "",
        isBuyer: "false", isSeller: "false", description: ""
    })


    useEffect(() => {
        if (localStorage.getItem("MBtoken0")) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        if (e.target.name === "image") {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                const data = JSON.stringify(reader.result)
                setCredentials({ ...credentials, [e.target.name]: data })
            }
            reader.readAsDataURL(file)
        }
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (e.target.value === "false") {
            setCredentials({ ...credentials, [e.target.name]: "true" })
        }
    }

    const onSubmit = () => {
        try {
            signup(credentials.image, credentials.name, credentials.email, credentials.password,
                credentials.isBuyer.toString(), credentials.isSeller.toString(), credentials.description)
            history.push('/?src=signup')
        } catch {
            alert('Something went wrong')
        }
    }

    return (
        <div className="container my-3">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" accept="image/jpeg, image/png" onChange={(e) => { onChange(e) }} className="form-control" id="image" name="image" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" pattern="[A-Za-z\s]{3,25}" title="Please enter a valid value" value={credentials.name} onChange={onChange} className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" minLength="5" maxLength="35" title="Please enter a valid value" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" minLength="8" maxLength="18" title="Please enter a valid value" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="isBuyer" className="form-label">I want to buy products here</label>
                    <input type="radio" value={credentials.isBuyer} onChange={onChange} id="isBuyer" name="isBuyer" />
                </div>
                <div className="mb-3">
                    <label htmlFor="isSeller" className="form-label">I want to sell products here</label>
                    <input type="radio" value={credentials.isSeller} onChange={onChange} id="isSeller" name="isSeller" />
                </div>
                <button type="submit" className="btn btn-primary">Join</button>
            </form>
            <div className="d-flex">
                <Link className="text-primary my-3" to="/login">Already have an account</Link>
            </div>
        </div>
    )
}

export default Signup
