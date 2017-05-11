import React, { Component, PropTypes } from 'react';
import videojs from 'video.js';
import 'videojs-youtube';

class VideoPlayer extends Component {

  componentDidMount () {
    // instantiate video.js
    let { src, poster } = this.props;
    let type = 'video/mp4';

    if (src.indexOf('youtu') > 0) {
      type = 'video/youtube';
    }

    const options = {
      autoPlay: false,
      controls: true,
      techOrder: ['flash', 'html5', 'youtube'],
      poster,
      sources: [{ src, type }],
      flash: {
        swf: 'http://www.flashls.org/videojs/video-js.swf'
      }
    };

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
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;
