import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export const ListItem = () => (
  <div className={css(styles.block)}>
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
export default ListItem
