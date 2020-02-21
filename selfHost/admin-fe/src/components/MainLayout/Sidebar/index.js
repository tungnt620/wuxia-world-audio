import React, { useState } from 'react'
import { Layout } from 'antd'
import Navigation from 'components/MainLayout/Navigation'
import Logo from 'components/MainLayout/Logo'

const { Sider } = Layout

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true)

  const collapseHandler = collapsed => {
    setCollapsed(collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={collapseHandler}>
      <Logo isCollapsed={collapsed}/>
      <Navigation/>
    </Sider>
  )
}

export default Sidebar
