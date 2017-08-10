import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import { Content, Tags } from './NewsContent';
import { Container, LeftSide, Margin10 } from '../Layout';

const PreviewForPhoto = ({ news: { Photos, ...news } }) => {
  const settings = {
    axis: 'horizontal',
    autoPlay: true,
    emulateTouch: true,
    showArrows: true,
    showStatus: false,
    showThumbs: true,
    showIndicators: false
  };
  return (
    <Container>
      <div className={css(styles.SlideBox)}>
        <Carousel {...settings}>
          {Photos.map(({ desc, sn, url }) => (
            <div className={css(styles.contentDiv)}>
              <img className={css(styles.contentImg)} src={url} />
              <p className={css(styles.imgDesc)}>{desc}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <Margin10 className='clearfix'>
        <LeftSide>
          <Content content={news.content} fontSize={16} freeContent={news.freeContent} />
          <Tags tags={news.Tags} />
        </LeftSide>
      </Margin10>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: '1rem 0'
  },
  contentImg: {
    height: '100%',
    width: 'auto !important'
  },
  contentDiv: {
    textAlign: 'center',
    background: '#f1f2f3',
    height: 570
  },
  imgDesc: {
    backgroundImage: 'url("/bg/bg-photo-news-desc.png")',
    bottom: 0,
    color: '#ffffff',
    fontSize: 16,
    height: 60,
    lineHeight: '60px',
    position: 'absolute',
    width: '100%'
  },
  SlideBox: {
    height: 570,
    marginBottom: 60
  }
});

PreviewForPhoto.propTypes = {
  news: PropTypes.object.isRequired
};

export default PreviewForPhoto;
