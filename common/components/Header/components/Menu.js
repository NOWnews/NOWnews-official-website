import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Menu = ({ menus }) => (
  <div>
    <div className={css(styles.menu)} >
      { menus.map((menu) =>
        <Link activeClassName={css(styles.link, styles.activeLink)}
          className={css(styles.link)}
          key={menu.sn}
          target={menu.isExternal === true ? '_blank' : '_self'}
          to={menu.url}>
          { menu.name }
        </Link>
      )}
    </div>
    <hr />
    {/* 子項先隱藏
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
    */}
  </div>
);

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
});

Menu.propTypes = {
  menus: PropTypes.array.isRequired
};

export default Menu;
