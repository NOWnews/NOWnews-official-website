import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import { CarouselCSS } from '../Layout';

export const Slide = ({ list, type = 'home' }) => {
  const settings = {
    axis: 'horizontal',
    autoPlay: true,
    emulateTouch: true,
    infiniteLoop: true,
    Link,
    showArrows: false,
    showStatus: false,
    showThumbs: false,
    width: '600px'
  };
  const isCategory = type !== 'home' && type !== 'topic';
  const category = isCategory ? `cat-${type}` : type;
  const fromStr = isCategory ? `${type}sli` : 'sli';
  return (
    <div>
      <CarouselCSS />
      <Carousel className={css(styles.box)} {...settings}>
        {list.map(({ parseUrl, url, MainPhoto, shortTitle, sn, startedAt, title }) => {
          return (
            <Link className={css(styles.ahref)} style={{backgroundImage: `url(${MainPhoto.medium})`}}
              alt={shortTitle || title}
              data-on='click' data-event-category={category} data-event-action='slide'
              key={sn} to={`${(parseUrl || url)}?from=${fromStr}`}>
              { /* <img className={css(styles.img)} src={MainPhoto.medium} /> */ }
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    float: 'left',
    paddingLeft: 55,
    width: 670
  },
  ahref: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'inline-block',
    backgroundPosition: 'center center',
    width: '100%',
    height: '337.5px'
  },
  img: {
    height: 337.5,
    width: 600
  }
});

Slide.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.string
};

export default Slide;
