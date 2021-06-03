import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchMe, logout } from '../actions/spotify'
import { fetchUserAlbums } from '../actions/users'

const Me = (props) => {
  const { me, appToken, token, userAlbums } = props
  const [redirect, setRedirect] = useState(false)

  const redirectUrl = encodeURIComponent(location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback')
  const authUrl = `https://accounts.spotify.com/authorize/?client_id=${appToken}&response_type=code&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email&state=34fFs29kd09&show_dialog=true`

  useEffect(() => {
    props.dispatch(fetchMe())
  }, [])

  useEffect(() => {
    if (me.id) {
      props.dispatch(fetchUserAlbums(me.id))
    }
  }, [me])

  const logOut = () => {
    props.dispatch(logout())
    setRedirect(true)
  }

  return (
    <>
      { token.access_token && (
        <>
          <p>This should show my spotify user, right?</p>
          <ul>
            <li>{me.id}</li>
          </ul>
          <h2>{me.display_name}</h2>
          <img src={me.photo_url} alt={me.display_name} />
          <button onClick={() => logOut()}>Log out</button>
        </>
      )}
      { !token.access_token && (
        <>
          <p><a href={authUrl}>Log me in</a> maybe?</p>
        </>
      )}
      { userAlbums.length && (
        <>
          <p>Found some albums!</p>
          <ul>
            {userAlbums.map(album => {
              return (
                <li key={album.sid}>
                  <img src={album.albumArt} alt={`Album art for ${album.name}`} height="200" width="200" />
                  <p>{album.name}</p>
                </li>
              )
            })}
          </ul>
        </>
      )}

      { redirect && (
        <Redirect to="/" />
      )}

    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    me: globalState.me,
    appToken: globalState.appToken,
    token: globalState.token,
    userAlbums: globalState.userAlbums
  }
}

export default connect(mapStateToProps)(Me)
