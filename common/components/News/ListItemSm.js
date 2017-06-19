import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

export const ListItemSm = ({ category, photo, time, title, type, url }) => {
  const { width, height, ...mainPhoto } = photo || {};
  let imgStyle = {};
  // 如果是接近方圖的話會往上位移 25%，因為方形的圖通常主要內容在中間。
  if (height >= width && (width - height) > -200) {
    const top = height * 95 / width / 4;
    imgStyle.top = `-${top}px`;
  }

  return (
    <Link className={`clearfix ${css(styles.box)}`} to={url}>
      <div className={`left ${css(styles.left)}`}>
        <img className={css(styles.img)} style={imgStyle}
          src={mainPhoto.thumbnail || mainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
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
    height: 95,
    width: 155,
    overflow: 'hidden'
  },
  img: {
    height: 'auto',
    position: 'relative',
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
  photo: PropTypes.object,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default ListItemSm;
