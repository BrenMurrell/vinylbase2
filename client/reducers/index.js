import { combineReducers } from 'redux'

import appToken from './appToken'
import me from './me'
import token from './token'
import searchResults from './searchResults'
import userAlbums from './userAlbums'

export default combineReducers({ me, searchResults, token, appToken, userAlbums })
