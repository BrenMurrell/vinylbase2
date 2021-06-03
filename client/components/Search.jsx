import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchSearchResults } from '../actions/spotify'
import { addUserAlbum } from '../actions/users'

const Search = (props) => {
  const { token, searchResults, me } = props
  const [formData, setFormData] = useState({
    type: '',
    q: ''
  })

  // const [redirect, setRedirect] = useState(false)

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addAlbum = (album, userId) => {
    props.dispatch(addUserAlbum(album, userId))
  }

  const submitForm = (e) => {
    e.preventDefault()
    props.dispatch(fetchSearchResults(formData))
  }
  return (
    <>
      { token.access_token && (
        <form action="/" onSubmit={(e) => submitForm(e)}>
          <h2>Search</h2>
          <select name="type" onChange={(e) => changeHandler(e)}>
            <option value="">--pick one</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
          </select>
          <input type="text" name="q" onChange={(e) => changeHandler(e)}/>
          <button type="submit">Go!</button>
        </form>
      ) }

      { !token.access_token && (
        <Redirect to="/me" />
      )}

      { searchResults.albums && (
        <ul>
          { searchResults.albums.items.map(result => {
            return (
              <li key={result.id}>
                <img src={result.images ? result.images[0].url : ''} alt={result.name} height="260" width="260" />
                <a href={result.external_urls.spotify}>
                  {result.name}- {result.artists[0].name}
                </a>
                <button onClick={() => addAlbum(result, me.id)}>Add to my library</button>
              </li>
            )
          })}
        </ul>
      ) }

      { searchResults.artists && (
        <ul>
          { searchResults.artists.items.map(result => {
            return (
              <li key={result.id}>
                <img src={result.images.length > 0 ? result.images[0].url : ''} alt={result.name} height="260" width="260" />
                <a href={result.external_urls.spotify}>
                  {result.name}
                </a>
              </li>
            )
          })}
        </ul>
      ) }
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    token: globalState.token,
    searchResults: globalState.searchResults,
    me: globalState.me
  }
}

export default connect(mapStateToProps)(Search)
