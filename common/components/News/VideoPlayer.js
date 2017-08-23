import React, { PureComponent, PropTypes } from 'react';
import videojs from 'video.js';
import 'videojs-youtube';

class VideoPlayer extends PureComponent {
  componentDidMount () {
    let { src, poster } = this.props;
    if (src.indexOf('facebook') > 0 || src.indexOf('streamable') > 0) {
      return;
    }

    /* -- Use Video Js Start -- */
    let type = 'video/mp4';

    if (src.indexOf('youtu') > 0) {
      type = 'video/youtube';
    }

    let options = {
      autoPlay: false,
      controls: true,
      techOrder: ['flash', 'html5', 'youtube'],
      poster,
      sources: [{ src, type }]
    };

    if (src.indexOf('.m3u8') > 0) {
      options.flash = {
        swf: '/src/video-js.swf'
      };
    }
    // 直接執行有時候在第一次播放會不正常
    let that = this;
    setTimeout(function () {
      that.player = videojs(that.videoNode, options);
    }, 200);

    /* -- Use Video Js End -- */
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
          <style dangerouslySetInnerHTML={{__html: `
            .video-js .vjs-big-play-button {
              border: 0 !important;
              border-radius: 50% !important;
              left: ${width / 2 - iconSize / 2}px !important;
              top: ${height / 2 - iconSize / 2}px !important;
              width: ${iconSize}px !important;
              height: ${iconSize}px !important;
            }
            .video-js .vjs-big-play-button:before {
              padding-top: ${(iconSize - fontSize) / 2 + 10}px !important;
              font-size: ${fontSize}px !important;
            }
            .vjs-youtube .vjs-poster {
                background-size: contain;
            }
          `}} />
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
