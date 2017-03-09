import React from 'react'
import Link from 'react-router/lib/Link'
import { StyleSheet, css } from 'aphrodite'

const Menu = () => (
  <div className='container'>
    <div className={css(styles.menu)} >
      { [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) =>
        <Link activeClassName={css(styles.link, styles.activeLink)}
          className={css(styles.link)}
          key={index}
          to='/category'>
          即時
        </Link>
      )}
    </div>
    <hr />
    <div className={css(styles.menu)} >
      { [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12].map((index) =>
        <Link activeClassName={css(styles.link, styles.activeLink)}
          className={css(styles.link)}
          key={index}
          to='/category'>
          軍事新聞
        </Link>
      )}
    </div>
  </div>
)

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    color: '#000',
    margin: '0.5rem 0',
    textDecoration: 'none',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  activeLink: {
    color: '#000'
  }
})

export default Menu
