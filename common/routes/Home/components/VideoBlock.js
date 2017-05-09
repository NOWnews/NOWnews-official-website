import React, { PropTypes, Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

class VideoBlock extends Component {
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
    const maxIndex = this.props.list.length - 4;
    const nextIndex = (positionIndex === maxIndex) ? maxIndex : positionIndex + 1;
    this.setState({positionIndex: nextIndex});
  }

  onSelectThumb (index) {
    this.setState({selectedIndex: index});
  }

  prev () {
    const { positionIndex } = this.state;
    const prevIndex = (positionIndex === 0) ? 0 : positionIndex - 1;
    this.setState({positionIndex: prevIndex});
  }

  render () {
    const thumbs = this.props.list.map(({ sn, MainPhoto, shortTitle }, index) => {
      const thumbTitleClass = css(
        styles.thumbTitle,
        (index === this.state.selectedIndex) ? styles.active : ''
      );

      return (
        <div className={`left ${css(styles.thumb)}`} key={sn} onClick={() => this.onSelectThumb(index)}>
          <img src={MainPhoto && MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'}
            alt={shortTitle} className={css(styles.img)} />
          <div className={thumbTitleClass}>{shortTitle}</div>
        </div>
      );
    });

    return (
      <Margin10 className='relative'>
        <div>
          <iframe width='970' height='500' src='https://www.youtube.com/embed/5Xvud7uqWNw' />
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
    color: '#1886FB'
  },
  img: {
    height: 130,
    width: '100%'
  },
  iconLeft: {
    ...iconStyles,
    left: -25
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
  }
});

VideoBlock.propTypes = {
  list: PropTypes.array.isRequired
};

export default VideoBlock;
