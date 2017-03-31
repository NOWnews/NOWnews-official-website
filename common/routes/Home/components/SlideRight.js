import moment from 'moment';
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const SlideRight = ({ newsList }) => (
  <div className={css(styles.box)}>
    {newsList.map(({ sn, shortTitle, startedAt }) => (
      <Link className={css(styles.link)} key={sn}
        to={`/news/${moment(startedAt).format('YYYYMMDD')}/${sn}`}>
        <div className={css(styles.item)}>{ shortTitle }</div>
      </Link>
    ))}
  </div>
);

const styles = StyleSheet.create({
  box: {
    float: 'right',
    width: 300
  },
  item: {
    backgroundColor: '#1E2425',
    borderTop: '3px solid #DFE1E2',
    color: '#ffffff',
    fontSize: 15,
    height: 67,
    lineHeight: '67px',
    paddingLeft: 30
  },
  link: {
    textDecoration: 'none'
  }
});

SlideRight.propTypes = {
  newsList: PropTypes.any.isRequired
};

export default SlideRight;
