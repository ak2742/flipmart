import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Item(props) {
    const { id, title, desc, price, img, usr, me, load_fn } = props;
    const dispatch = useDispatch()
    const { deleteOne, editOne } = bindActionCreators(pAC, dispatch)

    let my = false
    if (usr === me._id) {
        my = true
    }

    const editMe = async () => {
        const eImage = await prompt("Image", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        editOne(id, eImage, eTitle, eDesc, eCtgry, ePrice)
        alert("updated successfully")
        load_fn()
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            deleteOne(id)
            load_fn()
        }
    }
    return (
        <div className="card my-2 mx-2" style={{ "width": "18rem" }}>
            <img src={img} className="card-img-top" id='img_list' alt={title} />
            <div className="card-body">
                {my ? <div className="d-flex align-items-center">
                    <h5 className="card-title">{title}</h5>
                    <i role="button"
                        className="fas fa-edit mx-2"
                        onClick={editMe}
                    ></i>
                    <i role="button"
                        className="fas fa-trash mx-2"
                        onClick={deleteMe}
                    ></i>
                </div> : <h5 className="card-title">{title}</h5>
                }
                <h6 className="card-subtitle mb-2 text-muted">INR {price}</h6>
                <p className="card-text">{desc}</p>
                {!my ? <Link to={`/${usr}/${id}`} className="btn btn-primary">Open</Link> :
                    <Link to={`/${usr}/${id}`} className="btn btn-primary">Open</Link>}
            </div>
        </div>
    )
}

Item.defaultProps = {
    id: "",
    me: { _id: "" }
}

Item.propTypes = {
    id: PropTypes.string,
    me: PropTypes.object
}
