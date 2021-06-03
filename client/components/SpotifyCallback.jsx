import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchTokens } from '../actions/spotify'

const SpotifyCallback = (props) => {
  const [code, setCode] = useState('')
  const [redirect, setRedirect] = useState(false)

  function getQueryVariable (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      // eslint-disable-next-line eqeqeq
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1])
      }
    }
    console.log('Query variable %s not found', variable)
  }

  useEffect(() => {
    setCode(getQueryVariable('code'))
  }, [])

  useEffect(() => {
    if (code) {
      props.dispatch(fetchTokens(code))
    }
  }, [code])

  useEffect(() => {
    if (props.token.access_token) {
      setRedirect(true)
    }
  }, [props.token])

  return (
    <>
      <p>Logging in...</p>
      { redirect && (
        <Redirect to="/me" />
      )}
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    me: globalState.me,
    token: globalState.token
  }
}

export default connect(mapStateToProps)(SpotifyCallback)
