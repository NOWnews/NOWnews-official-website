import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const HotNews = ({ newsList }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.head)}>熱門</div>
    {newsList.map(({ sn, shortTitle }) => (
      <Link to={sn} key={sn}>
        <div className={css(styles.item)}>
          { shortTitle }
        </div>
      </Link>
    ))}
  </div>
);

// const liDomCommonStyle = {
//   listStyle: 'none'
// };

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
