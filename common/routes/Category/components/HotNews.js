import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const HotNews = ({ newsList }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.head)}>熱門</div>
    {[0, 1, 2, 3, 4, 5].map(({ sn, shortTitle }, i) => (
      <Link to={sn} key={i}>
        <div className={css(styles.item)}>
          { shortTitle }
        </div>
      </Link>
    ))}
  </div>
);

const styles = StyleSheet.create({
  box: {
    float: 'left',
    width: 300
  },
  head: {
    backgroundColor: '#AD6116',
    color: '#ffffff',
    fontSize: 16,
    height: 30,
    lineHeight: '30px',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#F1F2F3',
    borderTop: '1px solid #DFE1E2',
    color: '#515253',
    fontSize: 13,
    height: 40,
    lineHeight: '40px',
    paddingLeft: 30
  }
});

HotNews.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default HotNews;
