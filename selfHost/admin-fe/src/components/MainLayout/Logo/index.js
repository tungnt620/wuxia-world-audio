import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Logo = ({ isCollapsed }) => (
  <div className="logo">
    {isCollapsed ? (
      <img src={'https://www.wuxiaworld.com/Wu-White.svg'} alt="logo" />
    ) : (
      <img src={'https://www.wuxiaworld.com/Wu-White.svg'} alt="logo" />
    )}
  </div>
)

Logo.propTypes = {
  isCollapsed: PropTypes.bool,
}

Logo.defaultProps = {
  isCollapsed: false,
}

export default Logo
