import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem8 } from '../../../components/News';

const BlockItems = ({ newsList }) => {
  let items = newsList.map(({ sn, MainPhoto, title }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem8 key={sn}
          photo={MainPhoto}
          title={title} />
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
    float: 'left',
    margin: '10px 11.5px',
    width: 306,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
