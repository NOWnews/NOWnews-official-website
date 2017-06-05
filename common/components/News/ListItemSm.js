import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

export const ListItemSm = ({ category, photo, time, title, type, url }) => {
  const mainPhoto = photo || {};
  return (
    <Link className={`clearfix ${css(styles.box)}`} to={url}>
      <div className={`left ${css(styles.left)}`}>
        <img className={css(styles.img)} src={mainPhoto.thumbnail || mainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
        <TypeIcon type={type} size='LI_S' />
      </div>
      <div className={`right ${css(styles.right)}`}>
        {category && <div className={css(styles.category)}>{category}</div>}
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
    display: 'block',
    marginTop: 10,
    position: 'relative',
    textDecoration: 'none',
    width: '100%'
  },
  category: {
    color: '#1976d2',
    fontSize: 14,
    marginTop: '0rem'
  },
  left: {
    width: 155
  },
  img: {
    height: 95,
    maxHeight: 95,
    width: '100%'
  },
  right: {
    width: 145,
    padding: '0.5rem 0 0.5rem 1rem'
  },
  title: {
    color: '#000',
    fontSize: 14,
    margin: '5px 0'
  },
  time: {
    color: '#888',
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: -2
  }
});

ListItemSm.propTypes = {
  category: PropTypes.string,
  photo: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default ListItemSm;
