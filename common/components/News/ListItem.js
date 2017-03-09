import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Link from 'react-router/lib/Link'

export const ListItem = ({ news }) => (
  <Link className={css(styles.box)} to={'/news/' + news._id}>
    <div className={css(styles.left)}>
      <img className={css(styles.img)} src={news.MainPhoto ? news.MainPhoto.url : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
    </div>
    <div className={css(styles.right)}>
      <div className={css(styles.category)}>{news.MainMenu.name}</div>
      <div className={css(styles.title)}>{news.shortTitle}</div>
      <div className={css(styles.time)}>{news.formatCreatedAt}</div>
    </div>
  </Link>
)

const styles = StyleSheet.create({
  box: {
    display: 'inline-flex',
    height: 200,
    marginTop: '1rem',
    width: '100%'
  },
  category: {
    color: '#1976d2',
    fontSize: '13px',
    marginTop: '1rem'
  },
  left: {
    width: '25%'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
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
