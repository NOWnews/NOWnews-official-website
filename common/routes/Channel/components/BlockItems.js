import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import { Ad300x250 } from '../../../components/Ad';

const BlockItems = ({ newsList }) => {
  let items = [];

  newsList.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt }, key) => {
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

    if (key === 4 || key === 9) {
      items.push(<Ad300x250 key={`Ad${key}`} className={css(styles.blockItem)} />);
    }
  });

  return (
    <div className='clearfix'>
      { items }
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
