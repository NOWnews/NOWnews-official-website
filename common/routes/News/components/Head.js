import React from 'react'
import Link from 'react-router/lib/Link'
import { StyleSheet, css } from 'aphrodite'

const Head = ({ newsBy, mainMenu, title }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.content)}>
      <Link className={css(styles.category)}>{ mainMenu.name || '不分類' }</Link>
      <h2>{ title }</h2>
      <div>
        <span className={css(styles.author)}>{ newsBy }</span>
        <span className={css(styles.time)}>2017/1/1 09:45</span>
      </div>
    </div>
  </div>
)

const styles = StyleSheet.create({
  author: {

  },
  box: {
    backgroundColor: '#F1F2F3'
  },
  category: {
    color: '#1886FB',
    fontSize: '13px'
  },
  content: {
    margin: '1rem auto',
    padding: '1rem 0',
    width: 900
  },
  time: {

  }
})

export default Head
