import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';

export const Slide = ({ list }) => {
  const imgApi = 'https://imgapiv2.nownews.com/?w=600&q=70&src=';
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

  return (
    <Carousel className={css(styles.box)} {...settings}>
      {list.map(({ parseUrl, url, MainPhoto, shortTitle, sn, startedAt, title }) => {
        const imgUrl = (MainPhoto) ? `${imgApi}${MainPhoto.url}` : '';
        return (
          <Link className={css(styles.ahref)} style={{backgroundImage: `url(${imgUrl})`}}
            alt={shortTitle || title}
            key={sn} to={parseUrl || url}>
            { /* <img className={css(styles.img)} src={MainPhoto.url} /> */ }
          </Link>
        );
      })}
    </Carousel>
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
  list: PropTypes.array.isRequired
};

export default Slide;
