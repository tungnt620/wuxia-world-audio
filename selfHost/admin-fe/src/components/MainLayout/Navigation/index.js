import React from 'react'
import { Icon, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const { Item, SubMenu } = Menu

const Navigation = () => {
  const { pathname } = useLocation()

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={['home']} selectedKeys={[pathname]}>
      <Item key="/">
        <Link to="/">
          <Icon type="dashboard"/>
          <span className="nav-text">Dashboard</span>
        </Link>
      </Item>
    </Menu>
  )
}

export default Navigation
