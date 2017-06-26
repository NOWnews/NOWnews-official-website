import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Container } from '../../../components/Layout';

class VideoSelector extends PureComponent {

  render () {
    return (
      <div className={css(styles.box)}>
        <Container className={css(styles.container)}>
          <div className={css(styles.firstRow)}>
            {this.props.videoSourceList.slice(0, 5).map((item, index) => {
              return (
                <Link className={css(styles.firstRowItem, (this.props.currentVideoSource === item.id) && styles.active)}
                  key={item.id}
                  to={`/lylive/${item.id}`}>
                  <span className={css(styles.selectTitleOneLine)}>{item.title}</span>
                </Link>
              );
            })}
          </div>
          <div className={css(styles.secondRow)}>
            { this.props.videoSourceList.slice(5).map((item, index) => {
              return (
                <Link className={css(styles.secondRowItem, (this.props.currentVideoSource === item.id) && styles.active)}
                  key={item.id}
                  to={`/lylive/${item.id}`}>
                  <span className={css(styles.selectTitleTwoLine)}>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    background: '#FFFFFF',
    height: 170,
    position: 'relative'
  },
  container: {
    width: 850,
    background: '#f5f5f5',
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  firstRowItem: {
    color: '#343434',
    fontSize: 18,
    textDecoration: 'none',
    width: 850 / 5,
    boxSizing: 'border-box',
    display: 'inline-block',
    height: 100,
    border: '1px solid #e4e4e4',
    textAlign: 'center',
    verticalAlign: 'middle'

  },
  secondRowItem: {
    color: '#343434',
    fontSize: 18,
    textDecoration: 'none',
    width: 850 / 6,
    boxSizing: 'border-box',
    display: 'inline-block',
    height: 100,
    border: '1px solid #e4e4e4',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '0 10'
  },
  active: {
    color: '#5a9af6',
    background: '#eee',
    border: '3px solid transparent',
    borderImage: 'linear-gradient(to right, #3acfd5 0%, #3a4ed5 100%)',
    borderImageSlice: 1
  },
  selectTitleOneLine: {
    position: 'relative',
    top: '50%',
    marginTop: -12.5,
    display: 'block'
  },
  selectTitleTwoLine: {
    position: 'relative',
    top: '50%',
    marginTop: -25,
    display: 'block'
  }
});

VideoSelector.propTypes = {
  videoSourceList: PropTypes.array.isRequired,
  currentVideoSource: PropTypes.string.isRequired
};

export default VideoSelector;
