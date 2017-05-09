import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class InstantBar extends Component {
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
    const nextIndex = (index === 2) ? 0 : index + 1;
    this.setState({index: nextIndex});
  }

  render () {
    const { index } = this.state;
    const list = [
      '年金改革圍城　至少11起攻擊事件', '年金改革圍城　至少11起攻擊事件', '年金改革圍城　至少11起攻擊事件',
      '美女主播痛批工時制度  力挺司機', '美女主播痛批工時制度  力挺司機', '美女主播痛批工時制度  力挺司機',
      '蝶戀花周比蒼道歉：人車與友力無關', '蝶戀花周比蒼道歉：人車與友力無關', '蝶戀花周比蒼道歉：人車與友力無關'
    ];

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

    return (
      <div className={css(styles.box)}>
        <style dangerouslySetInnerHTML={{__html: customTransitionStyle}} />
        <span className={css(styles.text)}>即時跑馬燈</span>
        <CSSTransitionGroup {...transitionConfig}>
          <Link key={index * 3} className={css(styles.link)}>
            <span>{list[index * 3]}</span>
          </Link>
        </CSSTransitionGroup>
        <span className={css(styles.split)}>｜</span>
        <CSSTransitionGroup {...transitionConfig}>
          <Link key={index * 3 + 1} className={css(styles.link)}>
            <span>{list[index * 3 + 1]}</span>
          </Link>
        </CSSTransitionGroup>
        <span className={css(styles.split)}>｜</span>
        <CSSTransitionGroup {...transitionConfig}>
          <Link key={index * 3 + 2} className={css(styles.link)}>
            <span>{list[index * 3 + 2]}</span>
          </Link>
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
    position: 'relative'
  },
  link: {
    backfaceVisibility: 'hidden',
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
  list: PropTypes.array
};

export default InstantBar;
