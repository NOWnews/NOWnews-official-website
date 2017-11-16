import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import moment from 'moment';

class RelatedNews extends PureComponent {
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
                data-on='click' data-event-category='lylive' data-event-action='relation-news'
                key={item.sn}
                to={`${item.parseUrl}?from=lylist`}>
                <div className={css(styles.newsBlock)}>
                  <img src={item.MainPhoto && item.MainPhoto.thumbnail} className={css(styles.img)} />
                  <div className={css(styles.bottom)}>
                    <div className={css(styles.cat)}>{item.MainMenu.name}</div>
                    <div className={css(styles.title)}>{item.title}</div>
                    <img src='/icons/whiteClock.png' />
                    <span className={css(styles.date)}>
                      {moment(item.formatStartedAt).format('YYYY/MM/DD')}
                    </span>
                  </div>
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
  bottom: {
    marginLeft: 10
  },
  headline: {
    fontSize: 22,
    fontWeight: 400,
    color: '#FFFFFF',
    padding: '1rem',
    paddingLeft: 0,
    marginTop: 0
  },
  newsBlock: {
    marginRight: 15,
    display: 'inline-block',
    maxWidth: 240,
    verticalAlign: 'top'
  },
  img: {
    width: 240,
    height: 135
  },
  newsBlocks: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  cat: {
    color: '#1886FB',
    margin: 0,
    fontSize: 13
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 500,
    margin: 0,
    marginBottom: 5,
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '3.6em'
  },
  icon: {
    marginRight: 10
  },
  date: {
    color: '#888',
    fontSize: '13px',
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: '-2px'
  },
  preNextBlock: {
    width: 100,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 115
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

RelatedNews.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default RelatedNews;
