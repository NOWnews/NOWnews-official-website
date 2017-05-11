import React, { Component, PropTypes } from 'react';
import videojs from 'video.js';
import 'videojs-youtube';

class VideoPlayer extends Component {

  componentDidMount () {
    // instantiate video.js
    let { src, type } = this.props;

    let options = {
      autoPlay: false,
      controls: true
    };

    if (src.indexOf('youtu') > 0) {
      options.techOrder = ['youtube'];
      type = 'video/youtube';
    } else if (src.indexOf('mp4') > 0) {
      type = 'video/mp4';
    }

    options.sources = [{ src, type }];

    this.player = videojs(this.videoNode, options);
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render () {
    return (
      <div data-vjs-player>
        <video width='970' height='545' className='video-js'
          ref={node => { this.videoNode = node; }} />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string
  // src: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired
};

export default VideoPlayer;
