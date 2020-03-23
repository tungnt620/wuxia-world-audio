import React from 'react'
import { Icon, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { BookOutlined, DashboardOutlined } from '@ant-design/icons'

const { Item } = Menu

const Navigation = () => {
  const { pathname } = useLocation()

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={['home']} selectedKeys={[pathname]}>
      <Item key="/">
        <Link to="/">
          <DashboardOutlined />
          <span className="nav-text">Dashboard</span>
        </Link>
      </Item>
      <Item key="/book/list">
        <Link to="/book/list">
          <BookOutlined />
          <span className="nav-text">Book</span>
        </Link>
      </Item>
    </Menu>
  )
}

export default Navigation
