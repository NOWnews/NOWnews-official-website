import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import BlockItem from './BlockItem';
import { Ad300x250 } from '../Ad';
import Pagination from '../Pagination';

const BlockItems12 = ({ hasAd = true, newsList, page }) => {
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

    if (hasAd && (key === 1 || key === 6)) {
      items.push(<Ad300x250 key={`Ad${key}`} className={css(styles.blockItem)} />);
    }
  });

  return (
    <div>
      <div className='clearfix'>
        { items }
      </div>
      {page && <Pagination {...page} />}
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
    width: 300
  }
});

BlockItems12.propTypes = {
  hasAd: PropTypes.bool,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems12;
