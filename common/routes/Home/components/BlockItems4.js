import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockTopicItem } from '../../../components/News';

const BlockItems = ({ newsList }) => {
  let items = newsList.map(({ formatStartedAt, MainPhoto, sn, title, url }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <BlockTopicItem key={sn}
          category='專題'
          photo={MainPhoto}
          title={title}
          time={formatStartedAt}
          url={url} />
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
    margin: '25px 11.5px',
    width: 300,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
