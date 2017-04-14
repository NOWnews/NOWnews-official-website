import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { PersonalRightSide, SpecialTopicNav } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForPhoto = ({ news: { MainPhoto, Photos, ...news }, changeFontSize, fontSize }) => {
  let settings = {
    axis: 'horizontal',
    autoPlay: true,
    emulateTouch: true,
    showArrows: true,
    showStatus: false,
    showThumbs: true,
    showIndicators: false
  };
  let photoList = [MainPhoto, ...Photos];
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <Carousel {...settings}>
          {photoList.map(({ desc, sn, url }) => (
            <div className={css(styles.contentImg)}>
              <img key={sn} src={url} />
              <p className={css(styles.imgDesc)}>{desc}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <Margin10 className='clearfix'>
        <LeftSide>
          <Content content={news.content} fontSize={fontSize} />
          <Tags tags={news.Tags} />
          <Social />
          <ThermometerSm />
          <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
          <RelatedContent type='你可能會喜歡' list={news.relations} sn={news.sn} />
          <RecommendAds />
        </LeftSide>
        <RightSide>
          <Social />
          <FontSize changeFontSize={changeFontSize} />
          <Ad300x250 />
          <Thermometer />
          <PersonalRightSide newsList={[news, news, news, news, news]} />
          <Ad300x250 />
          <SpecialTopicNav list={[1, 2, 3, 4, 5, 6]} />
          <Ad300x250 />
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

ContentForPhoto.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default ContentForPhoto;
