import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const BlockTopicItem = ({ category, photo, time, title, url, ...props }) => {
  const dataOn = props['data-on'];
  const dataEventCategory = props['data-event-category'];
  const dataEventAction = props['data-event-action'];
  return (
    <Link className={css(styles.box)}
      data-on={dataOn} data-event-category={dataEventCategory} data-event-action={dataEventAction}
      to={url} target='_blank'>
      <img className={css(styles.img)} src={photo.thumbnail} alt={title} />
      <div className={css(styles.bottom)}>
        <div className={css(styles.category)}>{category}</div>
        <div className={css(styles.title)}><h3 className={css(styles.h3)}>{title}</h3></div>
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
    color: '#000000',
    fontSize: 13,
    position: 'absolute',
    top: '-115px',
    left: 0,
    background: '#fec340',
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
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '275px'
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'normal'
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

BlockTopicItem.propTypes = {
  'data-on': PropTypes.string,
  'data-event-action': PropTypes.string,
  'data-event-category': PropTypes.string,
  category: PropTypes.string.isRequired,
  photo: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default BlockTopicItem;
