import React from 'react'
import { Layout } from 'antd'
import Sidebar from 'components/MainLayout/Sidebar'
import './styles.scss'
import Header from './Header'
import useAuthentication from './useAuthentication'

const { Content, Footer } = Layout

const MainLayout = ({ children }) => {
  // useAuthentication()

  return (
    <Layout className="layout">
      <Sidebar />
      <Layout>
        <Header/>
        <Content className="main-content">{children}</Content>
        <Footer className="footer">My Audio Admin ©2020</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
