import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const BlockChannelItem = ({ photo = {}, sn, title }) => {
  return (
    <Link className={css(styles.box)} to={`/channel/${sn}`}>
      <img className={css(styles.img)} src={photo.thumbnail} alt={title} />
      <div className={css(styles.bottom)}>
        <div className={css(styles.title)}>{title}</div>
      </div>
    </Link>
  );
};
const height = 160;

const styles = StyleSheet.create({
  box: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  bottom: {
    position: 'absolute',
    top: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: height
  },
  img: {
    height: height,
    width: '100%'
  },
  title: {
    color: '#fff',
    lineHeight: `${height}px`,
    letterSpacing: '2px'
  }
});

BlockChannelItem.propTypes = {
  photo: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default BlockChannelItem;
