import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const BlockItem = ({ news }) => {
  let formatStartedAt = moment(news.startedAt).format('YYYYMMDD');
  return (
    <Link className={css(styles.box)} to={`/news/${formatStartedAt}/${news.sn}`}>
      <img className={css(styles.img)} src={news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
      <div className={css(styles.bottom)}>
        <div className={css(styles.category)}>{news.MainMenu.name || '不分類'}</div>
        <div className={css(styles.title)}>{news.shortTitle}</div>
        <div className={css(styles.time)}>{news.formatCreatedAt}</div>
      </div>
    </Link>
  );
};

const styles = StyleSheet.create({
  box: {
    color: '#000',
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
    height: 'auto',
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
    fontSize: '13px'
  }
});

BlockItem.propTypes = {
  news: PropTypes.shape().isRequired
};

export default BlockItem;
