import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import TypeIcon from './TypeIcon';

class ListItem extends PureComponent {
  render () {
    const { isExternal, category, photo, time, title, type, url } = this.props;
    const { width, height, ...MainPhoto } = photo || {};
    let imgStyle = {};
    // 如果是接近方圖的話會往上位移 25%，因為方形的圖通常主要內容在中間。
    if (height >= width && (width - height) > -200) {
      const top = height * 95 / width / 4;
      imgStyle.top = `-${top}px`;
    }
    const dataOn = this.props['data-on'];
    const dataEventCategory = this.props['data-event-category'];
    const dataEventAction = this.props['data-event-action'];

    return (
      <Link className={`clearfix ${css(styles.box)}`}
        data-on={dataOn} data-event-category={dataEventCategory} data-event-action={dataEventAction}
        to={url} target={isExternal === true ? '_blank' : null}>
        <div className={`left ${css(styles.left)}`}>
          <img className={css(styles.img)} style={imgStyle} src={MainPhoto.thumbnail} alt={MainPhoto.desc} />
          <TypeIcon type={type} size='LI' />
        </div>
        <div className={`right ${css(styles.right)}`}>
          <div className={css(styles.category)}>{category}</div>
          <div className={css(styles.title)}><h3 className={css(styles.h3)}>{title}</h3></div>
          <img src='/icons/whiteClock.png' />
          <span className={css(styles.time)}>
            {moment(time).format('YYYY/MM/DD')}
          </span>
        </div>
      </Link>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    display: 'block',
    marginTop: '1rem',
    position: 'relative',
    textDecoration: 'none',
    width: '100%'
  },
  category: {
    color: '#1976d2',
    fontSize: '14px',
    marginTop: '0.4rem'
  },
  left: {
    height: 95,
    width: 170,
    overflow: 'hidden'
  },
  img: {
    height: 'auto',
    position: 'relative',
    width: '100%'
  },
  right: {
    width: 500,
    padding: '0.5rem 0 0.5rem 1rem'
  },
  title: {
    color: '#000',
    fontSize: '18px',
    margin: '5px 0'
  },
  time: {
    color: '#888',
    fontSize: '13px',
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: '-2px'
  },
  h3: {
    fontSize: '18px',
    fontWeight: 'normal'
  }
});

ListItem.propTypes = {
  'data-on': PropTypes.string,
  'data-event-action': PropTypes.string,
  'data-event-category': PropTypes.string,
  category: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  photo: PropTypes.object,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default ListItem;
