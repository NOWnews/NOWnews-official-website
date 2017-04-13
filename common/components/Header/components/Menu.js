import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Menu = ({ menus, currentMainMenu, currentChildMenu }) => {
  let childMenus = [];
  let mainMenuDoms = [];

  menus.map(({ _id, child, isExternal, name, sn, url }) => {
    let isCurrentMainMenu = false;

    if (_id === currentMainMenu) {
      childMenus = child || [];
      isCurrentMainMenu = true;
    }

    let linkClass = css(
      styles.link,
      (isCurrentMainMenu) && styles.active
    );

    mainMenuDoms.push(
      <Link
        className={linkClass}
        key={sn}
        target={isExternal === true ? '_blank' : '_self'}
        to={url}>
        { name }
      </Link>
    );
  });

  return (
    <div>
      <div className={css(styles.menu)}>{ mainMenuDoms }</div>
      <hr />
      <div className={css(styles.menu)}>
        { childMenus.map(({ sn, isExternal, url, name }) =>
          <Link
            className={css(styles.link)}
            key={sn}
            target={isExternal === true ? '_blank' : '_self'}
            to={url}>
            { name }
          </Link>
        )}
      </div>
    </div>
  );
};

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
  active: {
    color: '#1886FB'
  }
});

Menu.propTypes = {
  currentMainMenu: PropTypes.string,
  currentChildMenu: PropTypes.string,
  menus: PropTypes.array.isRequired
};

export default Menu;
