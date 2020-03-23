import React from 'react'
import './styles.scss'
import { Layout, Dropdown, Icon, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/user/actions/login'
import { removeDomainInEmail } from '../../../shared/utility'

const { Header: HeaderAntd } = Layout

const Header = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.info.data)

  function onLogout() {
    dispatch(logout())
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={onLogout}>
        <a href={'#'}>Logout</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <HeaderAntd className="header">
      <Dropdown overlay={menu} className={'user'}>
        <a className="ant-dropdown-link" href="#">
          {removeDomainInEmail(userInfo?.email)} <Icon type="down" />
        </a>
      </Dropdown>
    </HeaderAntd>
  )
}

export default Header
