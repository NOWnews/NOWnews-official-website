import React from 'react'
import IndexLink from 'react-router/lib/IndexLink'
import { StyleSheet, css } from 'aphrodite'

const Logo = () => (
  <div className={css(styles.box)}>
    <IndexLink to='/'>
      <img className={css(styles.img)} alt='NOWnews Logo' src='/logo.png' />
    </IndexLink>
  </div>
)

const styles = StyleSheet.create({
  box: {
    height: 70,
    width: 295,
    paddingRight: '1rem'
  },
  img: {
    height: '100%',
    width: '100%'
  }
})

export default Logo
