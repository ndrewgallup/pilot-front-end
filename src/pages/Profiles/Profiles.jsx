import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'


const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(()=> {
    profileService.getAllProfiles()
    .then(profiles => setProfiles(profiles))
  }, [])

  let levels = [
     'Beginner',
     'Novice',
     'Intermediate',
     'Advanced',
     'Pro',
  ]

  return (
    <>
      <div className = "parent-card-group">
        <h2>Find a swim buddy!</h2>
          <div className="container">
            {profiles.length ? 
              <>
                  {profiles.map(profile=>
                  <div key={profile._id}>
                      <div className="card" style={{ width: '18rem', height: '29rem' }}>
                        {profile.photo &&
                          <div style={{height: '14rem' }}>
                            <img 
                              src={profile.photo}
                              alt='me'
                              className='card-img-top profile-pic pic'
                              height
                              ></img>
                            </div>}
                              <div className="card-body">
                              <h5 className="card-title">{profile.name}, {profile.location}</h5>
                              {profile.skillLevel && 
                                <p className="card-text">{levels[profile.skillLevel-1]} swimmer</p>
                              }
                              {profile.pilot[0].canPilot &&
                                <p className="card-text">pilot</p>
                              }
                              {profile.pilot[0].hasKayakSUP &&
                                <p className="card-text">🛶</p>
                              }
                              {profile.contact &&
                                <p className="card-text">{profile.contact}</p>
                              }
                            </div>    
                      </div>
                  </div>
                  )}
              </>
              :
              <p>No profiles yet</p>
            }
          </div>
        </div>
      </>
  )
}

export default Profiles