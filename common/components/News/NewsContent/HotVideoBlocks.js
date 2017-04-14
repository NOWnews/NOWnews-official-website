import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import { Margin10 } from '../../../components/Layout';

const HotVideoBlocks = ({ list }) => {
  let items = list.map((news) => {
    let { sn, MainPhoto, shortTitle, formatStartedAt } = news;
    return (
      <Link className={css(styles.blockItem)} key={sn}
        to={`/news/${moment(formatStartedAt).format('YYYYMMDD')}/${sn}`}>
        <img className={css(styles.img)} src={MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
        <div className={css(styles.bottom)}>
          <div className={css(styles.title)}>{shortTitle}</div>
          <img src='/icons/whiteClock.png' />
          <span className={css(styles.time)}>{moment(formatStartedAt).format('YYYY/MM/DD')}</span>
        </div>
      </Link>
    );
  });

  return (
    <Margin10>
      <h2>熱門新聞</h2>
      <Margin10 classNamew='clearfix'>{ items }</Margin10>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    color: '#000',
    float: 'left',
    marginRight: 30,
    textDecoration: 'none',
    width: 300
  },
  bottom: {
    marginLeft: 10
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

HotVideoBlocks.propTypes = {
  list: PropTypes.array.isRequired
};

export default HotVideoBlocks;
