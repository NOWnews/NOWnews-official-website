import React, { Component, PropTypes } from 'react';
import videojs from 'video.js';
import 'videojs-youtube';

class VideoPlayer extends Component {
  componentDidMount () {
    let { src, poster } = this.props;
    if (src.indexOf('facebook') > 0 || src.indexOf('streamable') > 0) {
      return;
    }

    // UseVideoJs
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
        swf: '/src/video-js.swf'
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
    const { width = 970, height = 545 } = this.props;
    const iconSize = 100;
    const fontSize = 70;
    const customVideoJsPlayer = `
      .video-js .vjs-big-play-button {
        border: 0;
        border-radius: 50%;
        left: ${width / 2 - iconSize / 2}px;
        top: ${height / 2 - iconSize / 2}px;
        width: ${iconSize}px;
        height: ${iconSize}px;
      }
      .video-js .vjs-big-play-button:before {
        padding-top: ${(iconSize - fontSize) / 2 + 10}px;
        font-size: ${fontSize}px;
      }
    `;

    let src = this.props.src;
    let useIframe = false;
    if (src.indexOf('facebook') > 0) {
      useIframe = true;
      src = `https://www.facebook.com/plugins/video.php?href=${src}&show_text=0&width=${width}&height=${height}`;
    } else if (src.indexOf('streamable') > 0) {
      useIframe = true;
    }
    return (
      <div>
        {useIframe && <iframe src={src}
          width={width} height={height} scrolling='no' frameBorder='0' allowTransparency='true' allowFullScreen='true' />}
        {!useIframe && <div data-vjs-player>
          <style dangerouslySetInnerHTML={{__html: customVideoJsPlayer}} />
          <video width={width} height={height} className='video-js'
            ref={node => { this.videoNode = node; }} />
        </div>}
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  height: PropTypes.number,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number
};

export default VideoPlayer;
