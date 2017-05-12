import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Logo } from './components';
import { Container } from '../Layout';

const FixedHeader = ({ currentMainMenu, menus, newsTitle }) => {
  const mainMenuDoms = [];

  menus.map(({ _id, child, isExternal, name, sn, url }) => {
    const isCurrentMainMenu = (_id === currentMainMenu);

    const linkClass = css(
      styles.link,
      (isCurrentMainMenu) && styles.active
    );

    mainMenuDoms.push(
      <Link
        className={linkClass}
        key={sn}
        target={isExternal === true ? '_blank' : null}
        to={url}>
        { name }
      </Link>
    );
  });

  return (
    <div className={css(styles.header)}>
      <Container className={css(styles.firstRow)}>
        <Logo customClass={css(styles.logo)} />
        <div className={css(styles.menu)}>{ mainMenuDoms }</div>
        <div className={css(styles.icons)}>
          <Link className={css(styles.iconLink)} to='/search'>
            <FontAwesome name='search' size='2x' />
          </Link>
          <Link className={css(styles.iconLink)} to='/user'>
            <FontAwesome name='user-circle-o' size='2x' />
          </Link>
        </div>
      </Container>
      <div className={css(styles.newsTitle)}>
        <Container>{ newsTitle }</Container>
      </div>
    </div>
  );
};

const firstRowHeight = 70;
const styles = StyleSheet.create({
  header: {
    background: '#ffffff',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 9999
  },
  firstRow: {
    color: '#999',
    height: firstRowHeight,
    position: 'relative'
  },
  menu: {
    display: 'inline-block',
    height: firstRowHeight,
    lineHeight: `${firstRowHeight}px`,
    position: 'relative'
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
    height: firstRowHeight,
    lineHeight: `${firstRowHeight}px`,
    marginLeft: 15,
    textDecoration: 'none',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  logo: {
    display: 'inline-block',
    minWidth: 151,
    position: 'relative',
    top: 4,
    width: 151
  },
  active: {
    color: '#1886FB'
  },
  icons: {
    position: 'absolute',
    right: 0,
    top: 19
  },
  iconLink: {
    color: '#999999',
    marginRight: 10,
    textDecoration: 'none',
    ':hover': {
      color: '#0080FF'
    }
  }
});

FixedHeader.propTypes = {
  currentMainMenu: PropTypes.string,
  menus: PropTypes.array.isRequired,
  newsTitle: PropTypes.string.isRequired
};

export default FixedHeader;
