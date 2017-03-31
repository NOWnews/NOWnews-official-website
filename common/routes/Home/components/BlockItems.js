import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import { ClearFix } from '../../../components/Layout';

const BlockItems = ({ newsList }) => {
  let items = [];
  newsList.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt }) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem key={sn}
          category={MainMenu && MainMenu.name || 'Sponsored'}
          photo={MainPhoto}
          title={shortTitle}
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
    margin: 11.5,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
