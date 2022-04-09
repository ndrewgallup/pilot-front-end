import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import style from './LocationPage.module.css'
import * as locationService from '../../services/locations'
import CommentCard from "../../components/CommentCard/CommentCard";
import CommentForm from "../../components/CommentForm/CommentForm";

const LocationDetails = (props) => {
  let location = useLocation()
  const [locationDetails, setLocationDetails] = useState(null)

  useEffect(() => {
    (async() => {
      const currLocation = await locationService.show(location.state.location._id)
      setLocationDetails(currLocation)
    })()
  }, [props.locations])

  const handleSubmit = async (evt, commentData) => {
    evt.preventDefault()
    props.handleAddComment(locationDetails._id, commentData)
  }

  return (
    locationDetails &&
    <>
        <div className = "parent-card-group">
          <div className={style.details}>
            <img 
              src={locationDetails.pictures}
              alt='the view'
              className='location-pic'
              style={{'maxWidth': "60%"}}
            />
            <div>
              <h2>{locationDetails.name}</h2>
              <p>Description: {locationDetails.description ? locationDetails.description : 'no description available yet'}</p>
              <p>Entry Points: {locationDetails.entryPoints ? locationDetails.entryPoints : 'none available yet'}</p>
              <p>Rating: {locationDetails.rating ? locationDetails.rating : 'no ratings available yet'}</p> 
              <Link
                to='/edit'
                state={{ location }}
              >
                <button className={style.btn}>Edit</button> 
              </Link>
              <Link to='/locations'>
                <button className={style.btn}>
                  Back to All Locations
                </button>
              </Link>
            </div>
          </div>
        </div>
        <CommentForm handleSubmit={handleSubmit} />
        {locationDetails.comments?.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>Comment</th>
                <th>Posted By</th>
              </tr>
            </thead>
            <tbody>
                  {locationDetails.comments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      handleDeleteComment={props.handleDeleteComment}
                      locationDetails={locationDetails}
                      user={props.user}
                    />
                  ))}
            </tbody>
          </table>
          }
    </>
   )
}

export default LocationDetails;