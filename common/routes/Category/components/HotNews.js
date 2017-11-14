import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { RightSide } from '../../../components/Layout';

const HotNews = ({ newsList, category }) => (
  <RightSide>
    <div className={css(styles.head)}>熱門</div>
    {newsList.map(({ shortTitle, sn, startedAt, parseUrl }) => (
      <Link className={css(styles.link)} key={sn}
        data-on='click' data-event-category={`cat-${category}`} data-event-action='slide-right'
        to={`${parseUrl}?from=${category}slir`}>
        <div className={css(styles.item)}>
          { shortTitle }
        </div>
      </Link>
    ))}
  </RightSide>
);

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#fec340',
    fontSize: 17,
    fontWeight: 'bold',
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

HotNews.propTypes = {
  category: PropTypes.string,
  newsList: PropTypes.any.isRequired
};

export default HotNews;
