import React from 'react'
import PropTypes from 'prop-types'
import logo from 'assets/images/logo-shopee.png'
import logo2 from 'assets/images/logo-shopee-2.png'
import './styles.scss'

const Logo = ({ isCollapsed }) => (
  <div className="logo">
    {isCollapsed ? <img src={logo2} alt="logo-shopee" /> : <img src={logo} alt="logo-shopee" />}
  </div>
)

Logo.propTypes = {
  isCollapsed: PropTypes.bool,
}

Logo.defaultProps = {
  isCollapsed: false,
}

export default Logo
