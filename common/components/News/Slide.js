import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import Slider from 'react-slick';

class Slide extends Component {
  constructor (props) {
    super(props);
    this.changeSlideIndex = this.changeSlideIndex.bind(this);
  }

  changeSlideIndex (index) {
    this.props.changeSlideIndex(index);
  }

  render () {
    let { newsList, slideIndex } = this.props;

    let settings = {
      arrows: false,
      autoplay: false,
      dots: true,
      infinite: true,
      speed: 500,
      dotsClass: 'custom-slick-dot',
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (prev, next) => {
        this.changeSlideIndex(next);
      }
    };

    return (
      <div className={css(styles.box)}>
        <Slider {...settings}>
          {newsList.map((news) => (
            <Link key={news.sn}>
              <img className={css(styles.img)} src={news.MainPhoto.url} />
            </Link>
          ))}
        </Slider>
        <span className={css(styles.title)}>{ newsList[slideIndex].shortTitle }</span>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    float: 'left',
    paddingLeft: 55,
    width: 670
  },
  img: {
    height: 337.5,
    width: 600
  },
  title: {
    backgroundColor: '#ffffff',
    bottom: 0,
    fontSize: 25,
    left: -55,
    padding: 5,
    position: 'relative',
    top: -55
  }
});

Slide.propTypes = {
  changeSlideIndex: PropTypes.any.isRequired,
  newsList: PropTypes.array.isRequired,
  slideIndex: PropTypes.number.isRequired
};

export default Slide;
