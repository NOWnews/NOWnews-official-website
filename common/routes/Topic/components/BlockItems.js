import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockTopicItem } from '../../../components/News';

const BlockItems = ({ topics }) => {
  let items = [];

  topics.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, url }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockTopicItem
          category='專題'
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={moment(formatStartedAt).format('YYYY/MM/DD')}
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
