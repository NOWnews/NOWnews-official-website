import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Logo } from './components';

const DynamicHeader = ({ currentMainMenu, menus, newsTitle = '123' }) => {
  let mainMenuDoms = [];

  menus.map(({ _id, child, isExternal, name, sn, url }) => {
    let isCurrentMainMenu = (_id === currentMainMenu);

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
    <div className={css(styles.header)}>
      <div className={css(styles.firstRow)}>
        <Logo />
        <div className={css(styles.menu)}>{ mainMenuDoms }</div>
      </div>
      <div className={css(styles.newsTitle)}>{ newsTitle }</div>
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    background: '#ffffff',
    minWidth: 970,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 9999
  },
  firstRow: {
    margin: '0rem 2rem',
    color: '#999',
    display: 'inline-flex'
  },
  menu: {
    width: '100%'
  },
  newsTitle: {
    background: '#F1F2F3',
    color: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    height: 45,
    lineHeight: '45px',
    padding: '0rem 2rem'
  },
  link: {
    color: '#000',
    display: 'inline-block',
    height: 70,
    lineHeight: '70px',
    marginLeft: 15,
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

DynamicHeader.propTypes = {
  currentMainMenu: PropTypes.string,
  menus: PropTypes.array.isRequired,
  newsTitle: PropTypes.string.isRequired
};

export default DynamicHeader;
