import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import styles from './Profiles.module.css'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  return (
    <>
      <body className={styles.container}>
        {profiles.length ? 
          <>
          <h2>SWIM BUDDIES</h2>
            <div className="card-group">
              {profiles.map(profile=>
                  <div key={profile._id} className="card" style={{ width: '18rem', height: '18rem' }}>
                    {profiles.photo?
                      <>
                        <img 
                          src={profiles.photo}
                          alt='me'
                          className='card-img-top profile-pic'></img>
                      </>
                      :
                      <>
                        <div className="card-body">
                          <h5 className="card-title">{profile.name}, {profile.location}</h5>
                          <p className="card-text">Swim level: {profile.skillLevel}</p>
                        </div>
                      </>
                      }  
                    </div>
              )}
            </div>
          </>
          :
            <p>No profiles yet</p>
          }
      </body>
    </>
  )
}
 
export default Profiles