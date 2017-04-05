import moment from 'moment';
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const SlideRight = ({ newsList }) => (
  <div className={css(styles.box)}>
    {newsList.map(({ sn, MainPhoto, shortTitle, startedAt }) => (
      <Link className={css(styles.link)} style={{backgroundImage: 'url(' + MainPhoto.url + ')'}} key={sn}
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
    backgroundColor: 'rgba(30, 36, 37, 0.6)',
    borderTop: '3px solid #DFE1E2',
    color: '#ffffff',
    fontSize: 15,
    height: 68,
    lineHeight: '67px',
    paddingLeft: 30
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
});

SlideRight.propTypes = {
  newsList: PropTypes.any.isRequired
};

export default SlideRight;
