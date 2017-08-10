import React, { PureComponent, PropTypes } from 'react';
// import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { VideoPlayer } from '../../../components/News';
import { Container } from '../../../components/Layout';
import moment from 'moment';

class MainVideoPlay extends PureComponent {
  constructor (props) {
    super(props);
    this.next = this.next.bind(this);
  }

  next () {
    this.props.nextVideo();
  }

  render () {
    const { news, showNextButton } = this.props;
    const { MainPhoto, MainVideo = {}, startedAt, sn, title, parseUrl } = news;
    return (
      <div className={css(styles.box)}>
        <Container className='clearfix'>
          <div className={css(styles.leftSide)} key={sn}>
            <VideoPlayer width={650} height={360} poster={MainPhoto.url} src={MainVideo.url} />
          </div>
          <div className={css(styles.rightSide)}>
            <h2 className={css(styles.title)}>{title}</h2>
            <img src='/icons/whiteClock.png' />
            <span className={css(styles.time)}>
              {moment(startedAt).format('YYYY.MM.DD hh:mm')}
            </span>
            <Link className={css(styles.linkContent)} to={parseUrl}>內文</Link>
            {/* 不確定分享要連到哪先隱藏
              <div className={css(styles.share)}>
                <FontAwesome name='share-alt' size='1x' />
                分享
              </div> */}
            {showNextButton &&
              <button className={css(styles.next)} onClick={this.next}>下一篇 ＞</button>}
          </div>
        </Container>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    background: '#1A1A1A',
    color: '#ffffff',
    width: '100%'
  },
  leftSide: {
    float: 'left',
    height: 360,
    width: 650
  },
  rightSide: {
    float: 'left',
    height: 360,
    padding: '1.5rem 2rem',
    position: 'relative',
    width: 320
  },
  title: {
    marginBottom: 20
  },
  time: {
    position: 'relative',
    top: -2.5,
    marginBottom: 10,
    color: '#888',
    fontSize: 13,
    marginLeft: 5
  },
  linkContent: {
    color: '#ffffff',
    border: '1px solid #ffffff',
    left: '2rem',
    fontSize: 14,
    position: 'absolute',
    padding: '1px 7px',
    textDecoration: 'none',
    top: '9.5rem'
  },
  share: {
    bottom: '1.5rem',
    cursor: 'pointer',
    fontSize: 16,
    left: '2rem',
    position: 'absolute'
  },
  next: {
    background: 'transparent',
    bottom: '1.5rem',
    border: 'none',
    color: '#ffffff',
    fontSize: 16,
    outline: 'none',
    position: 'absolute',
    right: 0
  }
});

MainVideoPlay.propTypes = {
  showNextButton: PropTypes.bool.isRequired,
  news: PropTypes.object.isRequired,
  nextVideo: PropTypes.func.isRequired
};

export default MainVideoPlay;
