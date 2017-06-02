import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import BlockItem from '../../../components/News/BlockItem';
// import Pagination from '../../../components';

const BlockItems6 = ({ newsList, page }) => {
  let items = [];

  newsList.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          category={MainMenu && MainMenu.name || 'Sponsored'}
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={formatStartedAt}
          type={type}
          url={parseUrl} />
      </div>
    );
  });

  return (
    <div>
      <div className='clearfix'>
        { items }
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    height: 245,
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    width: 350
  }
});

BlockItems6.propTypes = {
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems6;
