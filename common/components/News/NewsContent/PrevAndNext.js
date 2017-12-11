import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome from 'react-fontawesome';

const PrevAndNext = ({ prev, next }) => (
  <div className={css(styles.box)}>
    {prev && prev.parseUrl && <Link to={`${prev.parseUrl}?from=prev`} className={css(styles.prev)}
      data-on='click' data-event-category='news' data-event-action='prev'>
      <FontAwesome className={css(styles.prevIcon)} name='chevron-left' />
      <span className={css(styles.title)}>{ prev.shortTitle }</span>
    </Link>}
    <span className={css(styles.line)} />
    {next && next.parseUrl && <Link to={`${next.parseUrl}?from=next`} className={css(styles.next)}
      data-on='click' data-event-category='news' data-event-action='next'>
      <span className={css(styles.title)}>{ next.shortTitle }</span>
      <FontAwesome className={css(styles.nextIcon)} name='chevron-right' />
    </Link>}
  </div>
);

const commonLinkStyles = {
  background: 'no-repeat',
  backgroundSize: '100% 100%',
  width: '49%',
  color: '#999999',
  display: 'inline-block',
  margin: '20px 0',
  textDecoration: 'none',
  ':hover': {
    color: '#EE7800'
  }
};
const commonIconStyles = {
  color: '#999999 !important',
  background: '#fec340',
  padding: '3px 6px'
};
const styles = StyleSheet.create({
  box: {
    borderBottom: '1px solid #999999',
    borderTop: '1px solid #999999'
  },
  prev: {
    ...commonLinkStyles
  },
  prevIcon: {
    ...commonIconStyles,
    marginLeft: 10
  },
  line: {
    borderLeft: '1px solid #999999',
    fontSize: 35,
    top: 5,
    position: 'relative'
  },
  next: {
    ...commonLinkStyles,
    textAlign: 'right'
  },
  nextIcon: {
    ...commonIconStyles
  },
  title: {
    display: 'inline-block',
    width: 280,
    padding: '0 10px'
  }
});

PrevAndNext.propTypes = {
  prev: PropTypes.object,
  next: PropTypes.object
};
export default PrevAndNext;
