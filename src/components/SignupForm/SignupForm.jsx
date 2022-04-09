import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignupForm.module.css'
import * as authService from '../../services/authService'
import HoverRating from './HoverRating'
import Checkbox from '@mui/material/Checkbox'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    location: '',
    skillLevel: '',
    contact: '',
    pilot: false,
    kayakSUP: false,
    photo: '',
  })

  useEffect(()=>{console.log('formdata', formData)}, [formData])

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangePhoto = (evt) => {
    setFormData({...formData, photo: evt.target.files[0]})
  }

  const handleToggle = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: !formData[e.target.name]
    })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    const profileFormData = new FormData()
    profileFormData.append('photo', formData.photo)
		profileFormData.append('name', formData.name)
		profileFormData.append('email', formData.email)
		profileFormData.append('password', formData.password)
		profileFormData.append('passwordConf', formData.passwordConf)
    profileFormData.append('location', formData.location)
    profileFormData.append('contact', formData.contact)
    profileFormData.append('pilot', formData.pilot)
    profileFormData.append('kayakSUP', formData.kayakSUP)
    profileFormData.append('skillLevel', formData.skillLevel)
    
    try {
      await authService.signup(profileFormData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf, location, skillLevel, contact, pilot, kayakSUP} = formData


  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <div className = "signup-flex">
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="name" className={styles.label}>Name*</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>Email*</label>
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>Password*</label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirm" className={styles.label, styles.space}>
          Confirm Password*
        </label>
        <input
          type="password"
          autoComplete="off"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="location" className={styles.label}>Your location</label>
        <input
          type="text"
          autoComplete="off"
          placeholder="your city"
          id="location"
          value={location}
          name="location"
          onChange={handleChange}
        />
      </div> 
      <div className={styles.inputContainer}>
        <label htmlFor="skillLevel" id="skill">Skill Level</label>
        <HoverRating handleChange = {handleChange} />
      </div>
      <div className={styles.inputContainer}>
          <label htmlFor="skillLevel" className={styles.label}>Contact Info</label>
          <input
          type="text"
          autoComplete="off"
          placeholder="your email"
          id="contact"
          value={contact}
          name="contact"
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={styles.label}>Willing to Pilot?</label>
        <Checkbox
          id="pilot"
          value={pilot}
          name="pilot"
          onChange={handleToggle}
        />
      </div>
      <div>
        <label className={styles.label}>Do you have a Kayak or SUP?</label>
        <Checkbox
          id="kayakSUP"
          value={kayakSUP}
          name="kayakSUP"
          onChange={handleToggle}
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="photo-upload" className={styles.label}>
          Profile Photo  
        </label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Sign Up
        </button>
        <Link to="/">
          <button className={styles.button}>Cancel</button>
        </Link>
      </div>
    </form>
    </div>
  )
}

export default SignupForm
