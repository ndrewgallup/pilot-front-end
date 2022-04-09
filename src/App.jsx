import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import LocationDetails from './pages/LocationPage/LocationPage'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import AddLocation from './pages/AddLocation/AddLocation'
import LocationList from './pages/LocationList/LocationList'
import EditLocation from './pages/EditLocation/EditLocation'
import Header from '../src/components/header'

import * as authService from './services/authService'
import * as locationService from './services/locations'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

  const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [locations, setLocations] = useState([])

  const handleAddLocation = async newLocationData => {
    const newLocation = await locationService.create(newLocationData)
    setLocations([...locations, newLocation])
    navigate('/locations')
  }

  const handleAddComment = async (locationId, newCommentData) => {
    const updatedLocation = await locationService.createComment(locationId, newCommentData)
    const newLocationsArray = locations.map(location => location._id === updatedLocation._id ? updatedLocation : location
    )
    setLocations(newLocationsArray)
  }
  
  const handleDeleteComment = async (locationId, comId)  => {
    const updatedLocation = await locationService.deleteOne(locationId, comId)
    setLocations(locations.map(locatation => locatation._id === locationId ? updatedLocation : locatation))
  }

  const handleUpdateLocation = updatedLocationData => {
    locationService.update(updatedLocationData)
    .then(updatedLocation => {
      const newLocationsArray = locations.map(location => 
        location._id === updatedLocation._id ? updatedLocation : location)
      setLocations(newLocationsArray)
		  navigate('/locations')
    })
  }
  
  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    locationService.getAll()
      .then(allLocations => setLocations(allLocations))
  }, [])

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={<Landing user={user} handleLogout={handleLogout} />} 
        />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
        <Route 
          path='/add-location' 
          element={<AddLocation handleAddLocation={handleAddLocation} />} 
        />
        <Route 
          path='/locations'
          element= {<LocationList locations={locations} />}
        />
        <Route
          path="/location-page"
          element={ 
              <LocationDetails 
                  user={user} 
                  locations={locations} 
                  handleAddComment={handleAddComment} 
                  handleDeleteComment={handleDeleteComment} 
              />
          }
        />
        <Route 
          path='/edit' 
          element= {
              <EditLocation 
                  user={user} 
                  locations={locations} 
                  handleUpdateLocation={handleUpdateLocation} 
              />
          }
        />
      </Routes>
    </>
  )
}

export default App
