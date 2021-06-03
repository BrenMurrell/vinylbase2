import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Nav = (props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/me">Me</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    // : globalState.
  }
}

export default connect(mapStateToProps)(Nav)
