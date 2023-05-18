import React, { useState, useEffect } from 'react'
import Item from './Item'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC } from '../states/index'
import { useHistory } from 'react-router'

export default function Sell() {
    document.title = "Sell Products | mBazaar"
    const history = useHistory()
    const dispatch = useDispatch()

    const { loadByUserAuth, createNew } = bindActionCreators(pAC, dispatch)
    const { myAcc } = bindActionCreators(uAC, dispatch)

    const loadAll = () => {
        loadByUserAuth("me")
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

    const initState = { image: "", title: "", description: "", category: "", price: "" }
    const [credentials, setCredentials] = useState(initState)
    const [myImageTitle, setMyImageTitle] = useState("")


    const [me, setMe] = useState({})
    const [products, setProducts] = useState([])

    useSelector(state => state.me).then(arr => { setMe(arr) })
    useSelector(state => state.prod).then(arr => { setProducts(arr) })

    const onChange = (e) => {
        if (e.target.name === "image") {
            setMyImageTitle(e.target.value)
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                const data = JSON.stringify(reader.result)
                setCredentials({ ...credentials, [e.target.name]: data })
            }
            reader.readAsDataURL(file)
        }
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        try {
            createNew(credentials.image, credentials.title, credentials.description, credentials.category, credentials.price)
            setCredentials(initState)
            setMyImageTitle("")
            loadAll()
        } catch {
            alert('Something went wrong')
        }
    }

    return (
        <div className="container my-3">
            <form onSubmit={onSubmit} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength="3" maxLength="100" title="Please enter a valid value" value={credentials.title} onChange={onChange} className="form-control" id="title" name="title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea minLength="5" maxLength="350" title="Please enter a valid value" value={credentials.description} onChange={onChange} className="form-control" id="description" name="description" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" maxLength="15" title="Please enter a valid value" value={credentials.category} onChange={onChange} className="form-control" id="category" name="category" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price (INR)</label>
                    <input type="text" pattern="[0-9]{1,6}" title="Please enter a valid value" value={credentials.price} onChange={onChange} className="form-control" id="price" name="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image (.png/.jpeg)</label>
                    <input type="file" accept="image/jpeg, image/png" value={myImageTitle} onChange={(e) => { onChange(e) }} className="form-control" id="image" name="image" />
                </div>
                <button type="submit" className="btn btn-success">Publish</button>
            </form>
            <div className="row my-3">
                <h2 className='text-center'>{products.length === 0 && "!!! Add products to see here !!!"}</h2>
                {products.map((product) => {
                    return <div className="col-md-3" key={product._id}> <Item usr={product.user} id={product._id} title={product.title} desc={product.description} price={product.price} img={product.image} me={me} load_fn={loadAll} /> </div>
                })}
            </div>
        </div>
    )
}
