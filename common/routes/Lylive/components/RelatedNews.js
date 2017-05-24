import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import moment from 'moment';

class MainVideoPlay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      positionIndex: 0,
      selectedIndex: 0
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next () {
    const { positionIndex } = this.state;
    const maxIndex = (this.props.newsList.length <= 4) ? 0 : this.props.newsList.length - 4;
    const nextIndex = (positionIndex === maxIndex) ? maxIndex : positionIndex + 1;
    this.setState({positionIndex: nextIndex});
  }
  prev () {
    const { positionIndex } = this.state;
    const prevIndex = (positionIndex === 0) ? 0 : positionIndex - 1;
    this.setState({positionIndex: prevIndex});
  }
  renderScrollBar () {
    if (this.props.newsList.length > 0) {
      return (
        <div className={css(styles.preNextBlock)}>
          <div className={css(styles.leftArrow)} onClick={this.prev}>＜</div>
          <div className={css(styles.rightArrow)} onClick={this.next}>＞</div>
        </div>
      );
    }
  }
  render () {
    return (
      <div className={css(styles.box)}>
        <div>
          <h1 className={css(styles.headline)}>相關新聞</h1>
          <h1 className={this.props.newsList.length === 0 ? css(styles.noNews) : ''}> {this.props.newsList.length === 0 ? '找不到相關新聞！！' : ''}</h1>
        </div>
        <div className={css(styles.newsBlocks)} style={{width: this.props.newsList.length * 260, transitionDuration: '350ms', transform: `translate3d(${this.state.positionIndex * -260}px, 0px, 0px)`}}>
          { this.props.newsList.map((item, index) => {
            return (
              <Link className={css(styles.newsBlock)}
                key={item.sn}
                to={item.parseUrl}>
                <div className={css(styles.newsBlock)}>
                  <img src={item.MainPhoto.thumbnail} className={css(styles.img)} />
                  <p className={css(styles.cat)}>{item.MainMenu.name}</p>
                  <p className={css(styles.title)}>{item.title}</p>
                  <p className={css(styles.date)}>
                    <img src='/icons/whiteClock.png' />
                    {moment(item.formatStartedAt).format('YYYY.MM.DD')}
                  </p>
                </div>
              </Link>
            );
          })}

        </div>
        {this.renderScrollBar()}
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    background: '#000000',
    padding: '0 2rem',
    overflow: 'hidden'
  },
  headline: {
    fontSize: 22,
    fontWeight: 100,
    color: '#FFFFFF',
    padding: '1rem',
    paddingLeft: 0,
    marginTop: 0
  },
  newsBlock: {
    marginRight: 15,
    display: 'inline-block',
    maxWidth: 245,
    verticalAlign: 'top'
  },
  img: {
    width: '100%',
    maxHeight: 150
  },
  newsBlocks: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  cat: {
    color: '#70aaf5',
    margin: 0,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  title: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 0,
    paddingLeft: 10,
    whiteSpace: 'normal'
  },
  icon: {
    marginRight: 10
  },
  date: {
    color: '#f5f5f5',
    marginTop: 5,
    paddingLeft: 10
  },
  preNextBlock: {
    width: 100,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 150
  },
  leftArrow: {
    float: 'left',
    width: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    color: '#FFFFFF'
  },
  rightArrow: {
    float: 'right',
    width: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    color: '#FFFFFF'
  },
  noNews: {
    color: '#FFFFFF',
    fontSize: 25,
    height: 150,
    textAlign: 'center'
  }
});

MainVideoPlay.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default MainVideoPlay;
