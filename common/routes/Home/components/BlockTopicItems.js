import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockTopicItem } from '../../../components/News';

class BlockItems extends PureComponent {
  render () {
    const { newsList } = this.props;
    let items = newsList.map(({ createdAt, MainPhoto, sn, title, url }) => {
      return (
        <div key={sn} className={css(styles.blockItem)}>
          <BlockTopicItem key={sn}
            category='專題'
            data-on='click' data-event-category='home' data-event-action='topic'
            photo={MainPhoto}
            title={title}
            time={createdAt}
            url={`${url}?from=topic`} />
        </div>
      );
    });

    return (
      <div className='clearfix'>
        { items }
      </div>
    );
  };
}
const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: '12px 11.5px',
    width: 300,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
