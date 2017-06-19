import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const TopicRight = ({ topics }) => (
  <div className={css(styles.box)}>
    {topics.map(({ sn, MainPhoto, title, url }) => (
      <Link className={css(styles.link)} style={{backgroundImage: 'url(' + (MainPhoto.thumbnail || MainPhoto.url) + ')'}} key={sn}
        to={url}>
        <div className={css(styles.item)}>{ title }</div>
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
    fontSize: 17,
    height: 68,
    lineHeight: '68px',
    overflow: 'hidden',
    paddingLeft: 28,
    paddingRight: 25

  },
  link: {
    textDecoration: 'none',
    display: 'block',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
});

TopicRight.propTypes = {
  topics: PropTypes.any.isRequired
};

export default TopicRight;
