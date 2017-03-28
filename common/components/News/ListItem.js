import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const ListItem = ({ category, photo, time, title, url }) => (
  <Link className={css(styles.box)} to={url}>
    <div className={css(styles.left)}>
      <img className={css(styles.img)} src={photo ? photo.url : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
    </div>
    <div className={css(styles.right)}>
      <div className={css(styles.category)}>{category}</div>
      <div className={css(styles.title)}>{title}</div>
      <div className={css(styles.time)}>{time}</div>
    </div>
  </Link>
);

const styles = StyleSheet.create({
  box: {
    display: 'inline-flex',
    marginTop: '1rem',
    textDecoration: 'none',
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

});

ListItem.propTypes = {
  category: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default ListItem;
