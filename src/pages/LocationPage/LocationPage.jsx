import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import style from './LocationPage.module.css'

const LocationDetails = (props) => {
  const [locationDetails, setLocationDetails] = useState({})
  let location = useLocation()
  const [commentData, setCommentData] = useState({
    content: '',
  })
  
  useEffect(() => {
    // getAll(location.state.location.name)
    setLocationDetails(location.state.location)
  }, [])

  const handleChange = evt => {
  setCommentData({ ...commentData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    const updatedLocation= await props.handleAddComment(locationDetails._id, commentData)
    setLocationDetails(updatedLocation)
  }


  return ( 
    <>
        <div className = "parent-card-group">
            
          <div className={style.details}>
            <img 
              src={locationDetails.pictures}
              alt='the view'
              className='location-pic'            
            />
            <div>
              <p>{locationDetails.name}</p>
              <p>Description: {locationDetails.description ? locationDetails.description : 'no description availble yet'}</p>
              <p>Entry Points: {locationDetails.entryPoints ? locationDetails.entryPoints : 'none available yet'}</p>
              <p>Rating: {locationDetails.rating ? locationDetails.rating : 'no ratings availble yet'}</p> 
              <Link
                to='/edit'
                state={{location}}
              >
                <button>Edit</button> 
              </Link><br />
              <Link to='/locations'><button >Back to All Locations</button></Link>
            </div>
          </div>
        </div>
          <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
					<label htmlFor="comment-input" className="form-label">
						Comments
					</label>
					<input 
						type="text"
						className="form-control"
						id="comment-input"
						name="content"
            value={commentData
            .content}
            onChange={handleChange}
					/>
				</div>
          <button
						type="submit"
					>
						Add Comment
					</button><br></br>
          </form>
      {locationDetails?.comments?.length > 0 ?
          <table>
      <thead>
        <tr>
          <th>Comment</th>
          <th>Posted By</th>
        </tr>
    </thead>
    <tbody>
      
          {locationDetails.comments.map((comment) => (
          <tr key={comment._id}>
            <td>{comment.content}</td>
            <td>{comment.owner.name}</td>
            {props.user.profile === comment.owner?._id ?
              <td><button className="cmnt-btn"
                onClick={()=>
                  props.handleDeleteComment(locationDetails, comment._id)}
                user={props.user}
              >
                X
              </button></td>
                
                  :
              <td></td>
            }
          </tr> 
          ))}
        
    </tbody>
    </table>
    :
    <>
    <h3>No Comments Yet</h3>
    </>
    }
    </>
   )
}

export default LocationDetails;