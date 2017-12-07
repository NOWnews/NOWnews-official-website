import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const PrevAndNext = ({ prev, next }) => (
  <Margin10>
    {prev && <Link to={`${prev.parseUrl}?from=prev`} className={css(styles.prev)}
      data-on='click' data-event-category='news' data-event-action='prev'>
      <span className={css(styles.title)}>{ prev.title }</span>
    </Link>}
    {next && <Link to={`${next.parseUrl}?from=next`} className={css(styles.next)}
      data-on='click' data-event-category='news' data-event-action='next'>
      <span className={css(styles.title)}>{ next.title }</span>
    </Link>}
  </Margin10>
);

const commonStyles = {
  background: 'no-repeat',
  backgroundSize: '100% 100%',
  width: '90%',
  color: '#000',
  display: 'block',
  height: 65,
  textDecoration: 'none'
};
const styles = StyleSheet.create({
  prev: {
    ...commonStyles,
    backgroundImage: 'url("https://m.nownews.com/static/img/news/prev-btn-bg.png")'
  },
  next: {
    ...commonStyles,
    backgroundImage: 'url("https://m.nownews.com/static/img/news/next-btn-bg.png")'
  },
  title: {
    textAlign: 'center',
    display: 'block',
    position: 'relative',
    top: 20,
    ':hover': {
      color: '#EE7800',
      opacity: 0.6
    }
  }
});

PrevAndNext.propTypes = {
  prev: PropTypes.object,
  next: PropTypes.object
};
export default PrevAndNext;
