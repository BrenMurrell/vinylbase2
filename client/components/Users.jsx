import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  return (
    <></>
  )
}
const mapStateToProps = (globalState) => {
  return {
    users: globalState.users
  }
}

export default connect(mapStateToProps)(Users)
