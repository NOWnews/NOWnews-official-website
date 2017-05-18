import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import { Container } from '../../components/Layout';

export const NavBar = ({ selected = '' }) => {
  const navSourceData = [
    { url: '/lylive', name: '立院直播', type: 'LY_LIVE' },
    { url: '/video/instant', name: '影片', type: 'VIDEO' }
  ];

  const NavItemDoms = navSourceData.map(({ name, type, url }) => {
    let linkClass = css(
      styles.link,
      (type === selected) && styles.active
    );

    return (
      <Link className={linkClass} key={type} to={url}>
        { name }
      </Link>
    );
  });

  return (
    <div className={css(styles.box)}>
      <Container className={css(styles.container)}>
        { NavItemDoms }
      </Container>
    </div>
  );
};

const styles = StyleSheet.create({
  active: {
    background: '#9E8579',
    borderRadius: 5
  },
  box: {
    background: '#000000'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0 13rem'
  },
  link: {
    color: '#ffffff',
    fontWeight: 'bold',
    margin: '1rem 0',
    padding: '3px 15px',
    textDecoration: 'none',
    ':hover': {
      opacity: 0.6
    }
  }
});

NavBar.propTypes = {
  selected: PropTypes.string.isRequired
};

export default NavBar;
