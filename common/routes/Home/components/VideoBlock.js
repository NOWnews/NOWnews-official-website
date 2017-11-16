import React, { PropTypes, PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';
import { VideoPlayer } from '../../../components/News';

class VideoBlock extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      positionIndex: 0,
      selectedIndex: 0
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.onSelectThumb = this.onSelectThumb.bind(this);
  }

  next () {
    const { positionIndex } = this.state;
    const maxIndex = (this.props.list.length <= 4) ? 0 : this.props.list.length - 4;
    const nextIndex = (positionIndex === maxIndex) ? maxIndex : positionIndex + 1;
    this.setState({positionIndex: nextIndex});
  }

  onSelectThumb (index) {
    this.setState({selectedIndex: index});
    // 70 是 margin-top 要額外減掉
    var videoOffsetTop = document.getElementById('home-video-block').offsetTop;
    window.scroll(0, videoOffsetTop - 70);
  }

  prev () {
    const { positionIndex } = this.state;
    const prevIndex = (positionIndex === 0) ? 0 : positionIndex - 1;
    this.setState({positionIndex: prevIndex});
  }

  render () {
    const { list } = this.props;
    const selectedItem = list[this.state.selectedIndex];
    const thumbs = list.map(({ sn, MainPhoto, shortTitle }, index) => {
      const thumbTitleClass = css(
        styles.thumbTitle,
        (index === this.state.selectedIndex) ? styles.active : ''
      );

      return (
        <div className={`left ${css(styles.thumb)}`}
          data-on='click' data-event-category='home' data-event-action='video'
          key={index} onClick={() => this.onSelectThumb(index)}>
          <img src={MainPhoto.thumbnail} alt={shortTitle} className={css(styles.img)} />
          <div className={thumbTitleClass}><h3 className={css(styles.h3)}>{shortTitle}</h3></div>
        </div>
      );
    });

    return (
      <Margin10 className='relative'>
        <div className={css(styles.videoPlayer)}>
          <div key={this.state.selectedIndex}>
            <VideoPlayer height={500} poster={selectedItem.MainPhoto.large} src={selectedItem.MainVideo.url} />
          </div>
        </div>
        <FontAwesome className={css(styles.iconLeft)} name='chevron-left' size='2x'
          onClick={this.prev} />
        <Margin10 className={css(styles.thumbsWrapper)}>
          <div className='clearfix'
            style={{width: thumbs.length * 250, transitionDuration: '350ms', transform: `translate3d(${this.state.positionIndex * -242.5}px, 0px, 0px)`}}>
            {thumbs}
          </div>
        </Margin10>
        <FontAwesome className={css(styles.iconRight)} name='chevron-right' size='2x'
          onClick={this.next} />
      </Margin10>
    );
  }
};

const iconStyles = {
  background: '#000000',
  borderRadius: '50%',
  bottom: 90,
  color: '#ffffff',
  cursor: 'pointer',
  height: 50,
  opacity: 0.9,
  padding: '8px 15px 0 15px',
  position: 'absolute',
  zIndex: 10
};

const styles = StyleSheet.create({
  active: {
    background: '#000000',
    color: '#FFEC50'
  },
  img: {
    height: 130,
    width: '100%'
  },
  iconLeft: {
    ...iconStyles,
    left: -25
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'normal'
  },
  iconRight: {
    ...iconStyles,
    right: -20
  },
  thumbsWrapper: {
    color: '#ffffff',
    height: 200,
    maxWidth: 970,
    width: '100vw',
    overflow: 'hidden'
  },
  thumb: {
    background: '#000000',
    cursor: 'pointer',
    width: 235,
    height: 190,
    marginRight: 8,
    ':hover': {
      opacity: 0.8
    }
  },
  thumbTitle: {
    background: '#4A4C4D',
    height: 55.5,
    padding: '5px 10px'
  },
  videoPlayer: {
    background: '#000000',
    width: 970,
    height: 500
  }
});

VideoBlock.propTypes = {
  list: PropTypes.array.isRequired
};

export default VideoBlock;
