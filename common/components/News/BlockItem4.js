import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const BlockItem = ({ category, photo = {}, time, title, url }) => {
  return (
    <Link className={css(styles.box)} to={url}>
      <img className={css(styles.img)} src={photo.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
      <div className={css(styles.bottom)}>
        <div className={css(styles.category)}>{category}</div>
        <div className={css(styles.title)}>{title}</div>
        <img src='/icons/whiteClock.png' />
        <span className={css(styles.time)}>{time}</span>
      </div>
    </Link>
  );
};

const styles = StyleSheet.create({
  box: {
    color: '#fff',
    textDecoration: 'none'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    padding: '5px 10px'
  },
  category: {
    fontSize: 13,
    position: 'absolute',
    top: '-115px',
    left: 0,
    background: '#1380f5',
    padding: '2px 6px',
    fontWeight: 'bold'
  },
  img: {
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '190px',
    minHeight: '190px',
    width: '100%'
  },
  title: {
    margin: '5px 0',
    color: '#fff'
  },
  time: {
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: '-2px',
    paddingBottom: 6

  }
});

BlockItem.propTypes = {
  category: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default BlockItem;
