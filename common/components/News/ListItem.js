import React from 'react'
import { StyleSheet, css } from 'aphrodite'

export const ListItem = () => (
  <div className={css(styles.box)}>
    <div className={css(styles.left)}>
      <img className={css(styles.img)}src='http://fakeimg.pl/640x360/' />
    </div>
    <div className={css(styles.right)}>
      <div className={css(styles.category)}>生活</div>
      <div className={css(styles.title)}>標題標題標題標題標題標題標題標題標題</div>
      <div className={css(styles.time)}>2017/02/17</div>
    </div>
  </div>
)

const styles = StyleSheet.create({
  box: {
    display: 'inline-flex',
    height: 120,
    marginTop: '1rem'
  },
  category: {
    color: '#1976d2',
    fontSize: '13px',
    marginTop: '1rem'
  },
  left: {
    width: '35%'
  },
  img: {
    maxWidth: '100%'
  },
  right: {
    width: '65%',
    padding: '0.5rem 0 0.5rem 1rem'
  },
  title: {
    margin: '0.5rem 0',
    fontSize: '16px'
  },
  time: {
    color: '#888',
    fontSize: '13px',
    margin: '0.5rem 0'
  }

})
export default ListItem
