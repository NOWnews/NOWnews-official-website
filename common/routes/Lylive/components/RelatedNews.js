import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import moment from 'moment';

class MainVideoPlay extends Component {
  render () {
    return (
      <div className={css(styles.box)}>
        <div>
          <h1 className={css(styles.headline)}>相關新聞</h1>
        </div>
        <div className={css(styles.newsBlocks)}>
          { this.props.newsList.map((item, index) => {
            return (
              <Link className={css(styles.newsBlock)}
                key={index}
                to={`/news/${moment(item.formatStartedAt).format('YYYYMMDD')}/${item.sn}`}>
                <div className={css(styles.newsBlock)}>
                  <img src={item.MainPhoto.thumbnail} className={css(styles.img)} />
                  <p className={css(styles.cat)}>{item.MainMenu.name}</p>
                  <p className={css(styles.title)}>{item.title}</p>
                  <p className={css(styles.date)}>
                    <FontAwesome className={css(styles.icon)} name='clock-o' size='lg' />
                    {moment(item.formatStartedAt).format('YYYY.MM.DD')}
                  </p>
                </div>
              </Link>
            );
          })}

          { this.props.newsList.map((item, index) => {
            return (
              <Link className={css(styles.newsBlock)}
                key={index}
                to={`/news/${moment(item.formatStartedAt).format('YYYYMMDD')}/${item.sn}`}>
                <div className={css(styles.newsBlock)}>
                  <img src={item.MainPhoto.thumbnail} className={css(styles.img)} />
                  <p className={css(styles.cat)}>{item.MainMenu.name}</p>
                  <p className={css(styles.title)}>{item.title}</p>
                  <p className={css(styles.date)}>
                    <FontAwesome className={css(styles.icon)} name='clock-o' size='lg' />
                    {moment(item.formatStartedAt).format('YYYY.MM.DD')}
                  </p>
                </div>
              </Link>
            );
          })}

        </div>
        <div className={css(styles.preNextBlock)}>
          <div className={css(styles.leftArrow)}>＜</div>
          <div className={css(styles.rightArrow)}>＞</div>
        </div>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    background: '#000000',
    padding: '0 2rem'
  },
  headline: {
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
  }
});

MainVideoPlay.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default MainVideoPlay;
