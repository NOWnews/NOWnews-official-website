import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Ad200x70 } from '../Ad'
import { Logo, Menu, RightSide, RealTime } from './components'

export const Header = () => (
  <div>
    <div className={css(styles.header)}>
      <Logo />
      <Ad200x70 />
      <Ad200x70 />
      <RightSide />
    </div>
    <Menu />
    <RealTime />
  </div>
)

const styles = StyleSheet.create({
  ad: {
    textAlign: 'center',
    width: 230
  },
  header: {
    color: '#999',
    display: 'inline-flex'
  }
})
export default Header
