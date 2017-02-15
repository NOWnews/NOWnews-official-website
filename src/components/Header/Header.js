import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import LogoImg from './assets/Logo.png';

export const Header = () => (
  <div>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={LogoImg} />
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/news' activeClassName='route--active'>
      News
    </Link>

  </div>
)

export default Header
