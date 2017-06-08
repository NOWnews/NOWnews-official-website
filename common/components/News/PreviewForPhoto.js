import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import { Content, FontSize, Tags } from './NewsContent';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';

const PreviewForPhoto = ({ news: { Photos, ...news }, changeFontSize, fontSize }) => {
  const settings = {
    axis: 'horizontal',
    autoPlay: true,
    emulateTouch: true,
    showArrows: true,
    showStatus: false,
    showThumbs: true,
    showIndicators: false
  };
  const imgApi = 'https://imgapiv2.nownews.com/?w=970&q=70&src=';
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <Carousel {...settings}>
          {Photos.map(({ desc, sn, url }) => (
            <div className={css(styles.contentImg)}>
              <img key={sn} src={`${imgApi}${url}`} />
              <p className={css(styles.imgDesc)}>{desc}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <Margin10 className='clearfix'>
        <LeftSide>
          <Content content={news.content} fontSize={fontSize} />
          <Tags tags={news.Tags} />
        </LeftSide>
        <RightSide>
          <FontSize changeFontSize={changeFontSize} />
        </RightSide>
      </Margin10>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: '1rem 0'
  },
  contentImg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'inline-block',
    backgroundPosition: 'center center',
    width: '100%',
    height: 545
  },
  contentDiv: {
    background: '#f1f2f3',
    height: 545,
    marginBottom: 60
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
  }
});

PreviewForPhoto.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default PreviewForPhoto;
