import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockChannelItem } from '../../../components/News';

const BlockItems = ({ channels }) => {
  let items = channels.map(({ MainPhoto, sn, title }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <BlockChannelItem key={sn}
          photo={MainPhoto}
          sn={sn}
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
  channels: PropTypes.array.isRequired
};

export default BlockItems;
