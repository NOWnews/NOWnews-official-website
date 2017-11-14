import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockChannelItem } from '../../../components/News';

class BlockItems extends PureComponent {
  render () {
    const { channels } = this.props;
    let items = channels.map(({ MainPhoto, sn, title }) => {
      return (
        <div key={sn} className={css(styles.blockItem)}>
          <BlockChannelItem key={sn}
            data-on='click' data-event-category='home' data-event-action='channel'
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
  }
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: '0px 11.5px 10px',
    width: 306,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  channels: PropTypes.array.isRequired
};

export default BlockItems;
