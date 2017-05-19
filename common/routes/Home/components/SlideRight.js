import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const SlideRight = ({ newsList }) => (
  <div className={css(styles.box)}>
    {newsList.map(({ sn, MainPhoto, shortTitle, parseUrl }) => (
      <Link className={css(styles.link)} style={{backgroundImage: 'url(' + (MainPhoto.thumbnail || MainPhoto.url) + ')'}} key={sn}
        to={parseUrl}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderTop: '1px solid #ffffff',
    color: '#ffffff',
    fontSize: 16,
    height: 68,
    lineHeight: '68px',
    paddingLeft: 28
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
