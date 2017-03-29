import React, { PropTypes } from 'react';
// import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import ClearFix from '../../../components/ClearFix';

const BlockItems = ({ newsList }) => (
  <div>
    {newsList.map((news, i) => (
      <div key={news.sn} className={css(styles.blockItem)}>
        <BlockItem key={news.sn} news={news} />
      </div>
    ))}
    <ClearFix />
  </div>
);

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: 11.5,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
