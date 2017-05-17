import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import generateNewsUrl from '../../../../lib/generateNewsUrl';

const BlockItems = ({ newsList }) => {
  let items = newsList.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, type }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem key={sn}
          category={MainMenu && MainMenu.name || 'Sponsored'}
          photo={MainPhoto}
          title={shortTitle}
          type={type}
          time={formatStartedAt}
          url={generateNewsUrl(sn, formatStartedAt)} />
      </div>
    );
  });

  return (
    <div className='clearfix'>
      { items }
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    background: '#ffffff',
    float: 'left',
    margin: 11.5,
    paddingBottom: 10,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
