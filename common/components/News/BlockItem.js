import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

export const BlockItem = ({ category, photo, time, title, type, url }) => {
  const { width, height, ...mainPhoto } = photo || {};
  let imgStyle = {};
  // 如果是接近方圖的話會往上位移 20%，因為方形的圖通常主要內容在中間。
  if (height >= width && (width - height) > -200) {
    const top = height * 300 / width / 5;
    imgStyle.top = `-${top}px`;
  }

  return (
    <Link className={css(styles.box)} to={url}>
      <TypeIcon type={type} />
      <div className={css(styles.imgDiv)}>
        <img className={css(styles.img)} style={imgStyle}
          src={mainPhoto.thumbnail || mainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
      </div>
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
    fontSize: 13,
    position: 'relative',
    top: 5
  },
  img: {
    height: 'auto',
    marginBottom: 5,
    position: 'relative',
    width: '100%'
  },
  imgDiv: {
    background: '#f1f2f3',
    height: 168,
    maxheight: 168,
    overflow: 'hidden',
    textAlign: 'center'
  },
  title: {
    height: 22,
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

BlockItem.propTypes = {
  category: PropTypes.string.isRequired,
  photo: PropTypes.object,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default BlockItem;
