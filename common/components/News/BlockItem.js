import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

export const BlockItem = ({ category, photo, time, title, type, url }) => {
  const mainPhoto = photo || {};
  return (
    <Link className={css(styles.box)} to={url}>
      <TypeIcon type={type} />
      <img className={css(styles.img)} src={mainPhoto.thumbnail || mainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
      <div className={css(styles.bottom)}>
        <div className={css(styles.category)}>{category}</div>
        <div className={css(styles.title)}>{title}</div>
        <img src='/icons/whiteClock.png' />
        <span className={css(styles.time)}>
          {moment(time).format('YYYY/MM/DD')}
        </span>
      </div>
    </Link>
  );
};

const styles = StyleSheet.create({
  box: {
    color: '#000',
    display: 'block',
    position: 'relative',
    textDecoration: 'none'
  },
  bottom: {
    marginLeft: 10
  },
  category: {
    color: '#1886FB',
    fontSize: '13px'
  },
  img: {
    height: '168px',
    marginBottom: 5,
    maxWidth: '100%',
    maxHeight: '168px',
    width: '100%'
  },
  title: {
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

BlockItem.propTypes = {
  category: PropTypes.string.isRequired,
  photo: PropTypes.object,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default BlockItem;
