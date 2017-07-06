import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class InstantBar extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      index: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount () {
    this.interval = setInterval(this.updateIndex, 3000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  updateIndex () {
    const { index } = this.state;
    const nextIndex = (index === 3) ? 0 : index + 1;
    this.setState({index: nextIndex});
  }

  render () {
    const { index } = this.state;
    let { ads, news } = this.props;
    const customTransitionStyle = `
    .item-enter {
      opacity: 0.8;
      transform: rotateX(-90deg);
    }
    .item-enter.item-enter-active {
      transform: rotateX(0deg);
      opacity: 1;
      transition: all 500ms ease-in 500ms;
    }
    .item-leave.item-leave-active {
      transform: rotateX(90deg);
      transition: all 500ms ease-in;
    }`;

    const transitionConfig = {
      className: css(styles.linkWrapper),
      transitionAppear: false,
      transitionEnterTimeout: 1000,
      transitionLeaveTimeout: 500,
      transitionName: 'item'
    };

    if (!news) {
      news = {};
    }

    if (!ads) {
      ads = {};
    }

    const first = news[index * 2];
    const second = news[index * 2 + 1];
    const third = ads.instant[index];

    return (
      <div className={css(styles.box)}>
        <style dangerouslySetInnerHTML={{__html: customTransitionStyle}} />
        <span className={css(styles.text)}>即時跑馬燈</span>
        <CSSTransitionGroup {...transitionConfig}>
          {first &&
          <Link key={first.sn} className={css(styles.link)}
            to={first.parseUrl}>
            <span>{first.shortTitle}</span>
          </Link>
          }
        </CSSTransitionGroup>
        <span className={css(styles.split)}>｜</span>
        <CSSTransitionGroup {...transitionConfig}>
          {second &&
          <Link key={second.sn} className={css(styles.link)}
            to={second.parseUrl}>
            <span>{second.shortTitle}</span>
          </Link>}
        </CSSTransitionGroup>
        <span className={css(styles.split)}>｜</span>
        <CSSTransitionGroup {...transitionConfig}>
          {third && <Link key={index} className={css(styles.link)}
            to={third.url} target='_blank'>
            <span>{third.title}</span>
          </Link>}
        </CSSTransitionGroup>
      </div>
    );
  }
}

const lineHeight = 44;
const styles = StyleSheet.create({
  box: {
    backgroundImage: 'url("/bg/bg-header-instant-bar.png")',
    color: '#fff',
    display: 'inline-flex',
    height: lineHeight,
    margin: '0.5rem 0 1rem 0',
    width: 970
  },
  linkWrapper: {
    width: 272.5,
    overflow: 'hidden',
    position: 'relative'
  },
  link: {
    backfaceVisibility: 'hidden',
    color: '#ffffff',
    position: 'absolute',
    display: 'inline-block',
    fontWeight: 'bold',
    height: lineHeight,
    lineHeight: `${lineHeight}px`,
    textDecoration: 'none',
    textAlign: 'center',
    transition: '.2s opacity ease',
    transformStyle: 'preserve-3d',
    width: '100%',
    ':hover': {
      opacity: 0.6
    }
  },
  split: {
    height: lineHeight,
    lineHeight: `${lineHeight}px`
  },
  text: {
    height: lineHeight,
    lineHeight: `${lineHeight}px`,
    width: 120,
    textAlign: 'center',
    borderRight: '1px solid #fff'
  }
});

InstantBar.propTypes = {
  ads: PropTypes.object.isRequired,
  news: PropTypes.array.isRequired
};

export default InstantBar;
