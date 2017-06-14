import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../components/Layout';

const SpecialTopicNav = ({ list }) => (
  <Margin10>
    <div className={css(styles.head)}>專題</div>
    {list.map(({ sn, title, url }, key) => (
      <Link className={css(styles.link)} key={sn} to={url} target='_blank'>
        <div className={css(styles.item)}>{ title }</div>
      </Link>
    ))}
  </Margin10>
);

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#00A29C',
    color: '#ffffff',
    fontSize: 16,
    height: 30,
    lineHeight: '30px',
    overflow: 'hidden',
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#F1F2F3',
    borderTop: '1px solid #DFE1E2',
    color: '#515253',
    fontSize: 14,
    height: 40,
    lineHeight: '40px',
    overflow: 'hidden',
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  }
});

SpecialTopicNav.propTypes = {
  list: PropTypes.any.isRequired
};

export default SpecialTopicNav;
