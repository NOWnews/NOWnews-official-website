import moment from 'moment';
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const HotNews = ({ newsList }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.head)}>熱門</div>
    {newsList.map(({ shortTitle, sn, startedAt }) => (
      <Link className={css(styles.link)} key={sn}
        to={`/news/${moment(startedAt).format('YYYYMMDD')}/${sn}`}>
        <div className={css(styles.item)}>
          { shortTitle }
        </div>
      </Link>
    ))}
  </div>
);

const styles = StyleSheet.create({
  box: {
    float: 'right',
    width: 300
  },
  head: {
    backgroundColor: '#AD6116',
    color: '#ffffff',
    fontSize: 16,
    height: 40,
    lineHeight: '40px',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#F1F2F3',
    borderTop: '1px solid #DFE1E2',
    color: '#515253',
    fontSize: 13,
    height: 50,
    lineHeight: '50px',
    paddingLeft: 30
  },
  link: {
    textDecoration: 'none'
  }
});

HotNews.propTypes = {
  newsList: PropTypes.any.isRequired
};

export default HotNews;
