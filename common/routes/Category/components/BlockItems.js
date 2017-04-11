import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import { Ad300x250 } from '../../../components/Ad';

const BlockItems = ({ newsList }) => {
  var items = [];

  newsList.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          category={MainMenu && MainMenu.name || 'Sponsored'}
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={moment(formatStartedAt).format('YYYY/MM/DD')}
          url={`/news/${moment(formatStartedAt).format('YYYYMMDD')}/${sn}`} />
      </div>
    );

    if (key === 1 || key === 6) {
      items.push(<Ad300x250 key={`Ad${key}`} className={css(styles.blockItem)} />);
    }
  });

  return (
    <div className={`clearfix ${css(styles.box)}`}>
      { items }
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 25
  },
  blockItem: {
    float: 'left',
    height: 250,
    marginBottom: 30,
    marginRight: 70 / 2,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
