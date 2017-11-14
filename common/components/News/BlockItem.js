import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

class BlockItem extends PureComponent {
  render () {
    const { category, photo, target, time, title, type, url } = this.props;
    const { width, height, ...MainPhoto } = photo || {};
    let imgStyle = {};
    // 如果是接近方圖的話會往上位移 20%，因為方形的圖通常主要內容在中間。
    if (height >= width && (width - height) > -200) {
      const top = height * 300 / width / 5;
      imgStyle.top = `-${top}px`;
    }
    const dataOn = this.props['data-on'];
    const dataEventCategory = this.props['data-event-category'];
    const dataEventAction = this.props['data-event-action'];

    return (
      <Link className={css(styles.box)}
        data-on={dataOn} data-event-category={dataEventCategory} data-event-action={dataEventAction}
        to={url} target={target}>
        <TypeIcon type={type} />
        <div className={css(styles.imgDiv)}>
          <img className={css(styles.img)} style={imgStyle} src={MainPhoto.thumbnail} alt={title} />
        </div>
        <div className={css(styles.bottom)}>
          <div className={css(styles.category)}>{category}</div>
          <div className={css(styles.title)}><h3 className={css(styles.h3)}>{title}</h3></div>
          <img src='/icons/whiteClock.png' />
          <span className={css(styles.time)}>
            {moment(time).format('YYYY/MM/DD')}
          </span>
        </div>
      </Link>
    );
  };
};

const styles = StyleSheet.create({
  box: {
    color: '#000',
    display: 'block',
    position: 'relative',
    textDecoration: 'none'
  },
  bottom: {
    marginLeft: 10
  },
  category: {
    color: '#C86A01',
    fontSize: 13,
    height: 18.89,
    position: 'relative',
    top: 5
  },
  img: {
    height: 'auto',
    marginBottom: 5,
    position: 'relative',
    width: '100%'
  },
  imgDiv: {
    background: '#f1f2f3',
    height: 168,
    maxheight: 168,
    overflow: 'hidden',
    textAlign: 'center'
  },
  title: {
    height: 22,
    margin: '5px 0'
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'normal'
  },
  time: {
    color: '#888',
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: -2
  }
});

BlockItem.propTypes = {
  'data-on': PropTypes.string,
  'data-event-action': PropTypes.string,
  'data-event-category': PropTypes.string,
  category: PropTypes.string.isRequired,
  photo: PropTypes.object,
  target: PropTypes.string,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default BlockItem;
