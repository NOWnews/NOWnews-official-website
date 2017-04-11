import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const ListItem = ({ category, photo = {}, time, title, url }) => (
  <Link className={`clearfix ${css(styles.box)}`} to={url}>
    <div className={`left ${css(styles.left)}`}>
      <img className={css(styles.img)} src={photo.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
    </div>
    <div className={`right ${css(styles.right)}`}>
      <div className={css(styles.category)}>{category}</div>
      <div className={css(styles.title)}>{title}</div>
      <img src='/icons/whiteClock.png' />
      <span className={css(styles.time)}>{time}</span>
    </div>
  </Link>
);

const styles = StyleSheet.create({
  box: {
    display: 'block',
    marginTop: '1rem',
    textDecoration: 'none',
    width: '100%'
  },
  category: {
    color: '#1976d2',
    fontSize: '14px',
    marginTop: '0.4rem'
  },
  left: {
    width: 170
  },
  img: {
    height: 95,
    maxHeight: 95,
    width: '100%'
  },
  right: {
    width: 500,
    padding: '0.5rem 0 0.5rem 1rem'
  },
  title: {
    color: '#000',
    fontSize: '18px',
    margin: '5px 0'
  },
  time: {
    color: '#888',
    fontSize: '13px',
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: '-2px'
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
