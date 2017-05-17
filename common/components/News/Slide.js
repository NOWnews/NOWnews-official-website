import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import generateNewsUrl from '../../../lib/generateNewsUrl';

export const Slide = ({ list }) => {
  let settings = {
    axis: 'horizontal',
    autoPlay: true,
    emulateTouch: true,
    Link,
    showArrows: false,
    showStatus: false,
    showThumbs: false,
    width: '600px'
  };

  return (
    <Carousel className={css(styles.box)} {...settings}>
      {list.map(({ MainPhoto, shortTitle, sn, startedAt, title, url }) => {
        if (!url) {
          url = generateNewsUrl(sn, startedAt);
        }

        return (
          <Link className={css(styles.ahref)} style={{backgroundImage: `url(${MainPhoto.url})`}}
            alt={shortTitle || title}
            key={sn} to={url}>
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
