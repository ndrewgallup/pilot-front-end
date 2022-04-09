import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import style from './EditLocation.module.css' 

function EditLocation(props) {
  const location = useLocation()
	const [formData, setFormData] = useState(location.state.location.state.location) 
  const [validForm, setValidForm] = useState(true)
  const formElement = useRef()
  
  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleSubmit = evt => {
		evt.preventDefault()
		props.handleUpdateLocation(formData)
	}

  return (
		<>
		<div className = "parent-card-group">
			<h2>Edit Location</h2>
				<div className={style.main}>
					<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
						<div className="form-group mb-3">
							<label htmlFor="name-input" className={style.label}>
								Location Name
							</label>
							<input 
								type="text"
								className="form-control"
								id="name-input"
								name="name"
								required
								value={formData.name}
								onChange={handleChange}
							/>
						</div><br />
						<div className="form-group mb-3">
							<label htmlFor="description-input" className={style.label}>
								Location Description
							</label>
							<input 
								type="text"
								className="form-control"
								id="description-input"
								name="description"
								value={formData.description}
								onChange={handleChange}
							/>
						</div><br />
						<div className="form-group mb-3">
							<label htmlFor="name-input" className={style.label}>
								Entry Points
							</label>
							<input 
								type="text"
								className="form-control"
								id="entry-input"
								name="entryPoints"
								value={formData.entryPoints}
								onChange={handleChange}
							/>
						</div><br />
						<div className="form-group mb-3">
							<label htmlFor="rating-input" className={style.label}>
								Rating
							</label>
							<input 
								type="Number"
								className="form-control"
								id="rating-input"
								name="rating"
								value={formData.rating}
								onChange={handleChange}
							/>
						</div>
						<br />
						<div className="update-btn">
						<button 
								type="submit"
								className={style.btn}
								disabled={!validForm}
							>
								Save
							</button>
							</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default EditLocation