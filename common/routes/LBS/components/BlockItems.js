import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DFP } from '../../../components/Ad';
import Pagination from '../../../components/Pagination';
import { BlockItem } from '../../../components/News';

const BlockItems = ({ newsList, page, local }) => {
  let items = [];

  newsList.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          category={MainMenu && MainMenu.name || 'Sponsored'}
          data-on='click' data-event-category='lbs' data-event-action='list'
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={formatStartedAt}
          type={type}
          url={`${parseUrl}?from=lbslist`} />
      </div>
    );

    if (key === 1) {
      items.push(<DFP key={`Ad_M1`} className={css(styles.blockItem)}
        opts={['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']} />);
    } else if (key === 6) {
      items.push(<DFP key={`Ad_M2`} className={css(styles.blockItem)}
        opts={['/5799246/Nownews_home_300x250_M2_new2', [300, 250], 'div-gpt-ad-1496983198899-0']} />);
    }
  });

  return (
    <div>
      <div className='clearfix'>
        { items }
      </div>
      {page && <Pagination {...page} {...local} />}
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

BlockItems.propTypes = {
  local: PropTypes.object,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems;
