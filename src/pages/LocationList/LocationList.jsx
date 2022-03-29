import { getLocation } from "../../services/locations"
import { Link } from "react-router-dom"



function LocationList(props) {
  
  return (
    <>
    
      <h1>Locations!!</h1>
      <div className="list-items">
        {props.locations?.map(location => (
          <Link
          to="/location-page"
          state={{location}}
          style={{textDecoration: "none"}}
          >
          <div key={location._id}>
            <p>Location Name: {location.name}</p>
            <p>Description: {location.description}</p><br />
            <div id="myMap" ></div>
          </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default LocationList