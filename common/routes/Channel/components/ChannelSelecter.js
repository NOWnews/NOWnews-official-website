import React, { PropTypes, Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

class ChannelSelecter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.switchOpenStatus = this.switchOpenStatus.bind(this);
    this.switchChannel = this.switchChannel.bind(this);
  }

  switchOpenStatus () {
    this.setState({isOpen: !this.state.isOpen});
  }

  switchChannel (sn) {
    this.setState({isOpen: false});
    window.history.pushState(null, null, `/channel/${sn}`);
    this.props.loadChannelData(sn);
  }

  render () {
    let { channels, selectedChannel } = this.props;

    let items = channels.map(({ sn, title }) => {
      let isActive = (sn === selectedChannel.sn) ? css(styles.activeItem) : '';
      return (
        <span key={sn} className={`${css(styles.channelItem)} ${isActive}`}
          onClick={() => { this.switchChannel(sn); }}>
          {title}
        </span>
      );
    });
    let iconRotate = (this.state.isOpen) ? 'fa-rotate-270' : 'fa-rotate-90';
    let isOpen = (this.state.isOpen) ? '' : 'hide';
    return (
      <Margin10 className='center'>
        <button className={css(styles.selecter)} onClick={this.switchOpenStatus}>
          <span className={css(styles.selType)}>特輯</span>
          <span className={css(styles.selTitle)}>{ selectedChannel.title }</span>
          <FontAwesome name='play' className={`${iconRotate} ${css(styles.selIcon)}`} size='2x' />
        </button>
        <div className={`clearfix ${isOpen} ${css(styles.channelsBox)}`}>{ items }</div>
      </Margin10>
    );
  }
};

const styles = StyleSheet.create({
  activeItem: {
    color: '#1886FB'
  },
  channelsBox: {
    background: '#ffffff',
    marginTop: 10,
    opacity: 0.8,
    padding: '10px 20px',
    position: 'absolute',
    textAlign: 'center',
    width: 970
  },
  channelItem: {
    color: '#000000',
    float: 'left',
    padding: '8px 0',
    width: 155,
    ':hover': {
      opacity: 0.6
    }
  },
  selecter: {
    backgroundImage: 'url("/bg/bg-channel-selecter.png")',
    backgroundRepeat: 'repeat-y',
    border: 0,
    cursor: 'pointer',
    height: 54,
    lineHeight: '54px',
    outline: 'none',
    position: 'relative',
    width: 327
  },
  selIcon: {
    position: 'absolute',
    top: 16.5,
    right: 30
  },
  selTitle: {
    fontSize: 20,
    left: 15,
    position: 'relative'
  },
  selType: {
    color: '#ffffff',
    fontSize: 25,
    left: 13,
    position: 'absolute'
  }
});

ChannelSelecter.propTypes = {
  channels: PropTypes.array.isRequired,
  loadChannelData: PropTypes.func.isRequired,
  selectedChannel: PropTypes.object.isRequired
};

export default ChannelSelecter;
