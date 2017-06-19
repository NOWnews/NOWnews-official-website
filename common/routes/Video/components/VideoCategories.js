import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Container } from '../../../components/Layout';

const VideoCategories = ({ menus, currentCategory }) => {
  const instant = {
    categoryName: 'instant',
    name: '最新'
  };
  const newMenus = [instant, ...menus];
  let mainMenuDoms = [];

  newMenus.forEach(({ categoryName, isExternal, name }) => {
    if (isExternal) {
      return;
    }

    const linkClass = css(
      styles.link,
      (categoryName === currentCategory) && styles.active
    );

    mainMenuDoms.push(
      <Link
        className={linkClass}
        key={categoryName}
        to={`/video/${categoryName}`}>
        { name }
      </Link>
    );
  });

  return (
    <div className={css(styles.box)}>
      <Container className={css(styles.menu)}>
        { mainMenuDoms }
      </Container>
    </div>
  );
};

const styles = StyleSheet.create({
  active: {
    color: '#1886FB'
  },
  box: {
    background: '#F7F7F7',
    borderBottom: '2px solid #ECECEC',
    marginBottom: 20
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    color: '#000',
    fontSize: 14.5,
    fontWeight: 'bold',
    margin: '0.7rem 0',
    textDecoration: 'none',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  }
});

VideoCategories.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  menus: PropTypes.array.isRequired
};

export default VideoCategories;
