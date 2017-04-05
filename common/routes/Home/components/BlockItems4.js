import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem4 } from '../../../components/News';
import { ClearFix } from '../../../components/Layout';

const BlockItems = ({ newsList }) => {
  let items = [];
  newsList.map(({ sn, MainPhoto, title, formatStartedAt }) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem4 key={sn}
          category={'專題'}
          photo={MainPhoto}
          title={title}
          time={moment(formatStartedAt).format('YYYY/MM/DD')}
          url={`/news/${moment(formatStartedAt).format('YYYYMMDD')}/${sn}`} />
      </div>
    );
  });

  return (
    <div>
      { items }
      <ClearFix />
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: '25px 11.5px',
    width: 300,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
