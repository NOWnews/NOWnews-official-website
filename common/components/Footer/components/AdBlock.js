import React from 'react'
import { Ad150x150 } from '../../Ad'
import { StyleSheet, css } from 'aphrodite'

export const Header = () => (
  <div className={css(styles.block)}>
    <Ad150x150 />
    <div className={css(styles.title)}>標題標題標題標題標題標題標題標題標題</div>
  </div>
)

const styles = StyleSheet.create({
  block: {
    textAlign: 'center',
    width: 970 / 5
  },
  title: {
    color: '#fff',
    margin: '0 auto',
    width: 150
  }
})
export default Header
