import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockTopicItem } from '../../../components/News';

const BlockItems = ({ topics }) => {
  let items = [];

  topics.forEach(({ sn, MainMenu, MainPhoto, title, createdAt, url }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockTopicItem
          category='專題'
          key={sn}
          photo={MainPhoto}
          title={title}
          time={createdAt}
          url={url || ''} />
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
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    position: 'relative',
    width: 300
  }
});

BlockItems.propTypes = {
  topics: PropTypes.array.isRequired
};

export default BlockItems;
