import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { RightSide } from '../../../components/Layout';

const HotTopics = ({ topics }) => (
  <RightSide>
    <div className={css(styles.head)}>熱門</div>
    {topics.map(({ shortTitle, sn, startedAt, url }) => (
      <Link className={css(styles.link)} key={sn} to={url}>
        <div className={css(styles.item)}>
          { shortTitle }
        </div>
      </Link>
    ))}
  </RightSide>
);

const styles = StyleSheet.create({
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

HotTopics.propTypes = {
  topics: PropTypes.any.isRequired
};

export default HotTopics;
