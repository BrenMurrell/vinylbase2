import React from 'react'
import { connect } from 'react-redux'

const Album = (props) => {
  return (
    <>
      {props.name}
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    // : globalState.
  }
}

export default connect(mapStateToProps)(Album)
