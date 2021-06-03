import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  // NavLink,
  Route
  // Switch
} from 'react-router-dom'

import { fetchAppToken, fetchMe } from '../actions/spotify'
import { fetchUserAlbums } from '../actions/users'

import Me from './Me'
import Nav from './Nav'
import Search from './Search'
import SpotifyCallback from './SpotifyCallback'

const App = (props) => {
  const { me } = props

  useEffect(() => {
    props.dispatch(fetchAppToken())
    props.dispatch(fetchMe())
  }, [])

  useEffect(() => {
    if (me.id) {
      props.dispatch(fetchUserAlbums(me.id))
    }
  }, [me])

  return (
    <Router>
      <Nav />
      <Route path='/me' exact component={Me} />
      <Route path='/callback' exact component={SpotifyCallback} />
      <Route path='/search' exact component={Search} />
    </Router>

  )
}

function mapStateToProps (globalState) {
  return {
    appToken: globalState.appToken,
    me: globalState.me,
    userAlbums: globalState.userAlbums
  }
}

export default connect(mapStateToProps)(App)
