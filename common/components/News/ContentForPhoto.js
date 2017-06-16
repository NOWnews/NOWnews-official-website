import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { SpecialTopicNav, TripletNav } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

class ContentForPhoto extends Component {

  constructor (props) {
    super(props);
    this.onWarm = this.onWarm.bind(this);
  }

  onWarm () {
    const { news, onWarm } = this.props;
    onWarm(news._id, news.MainMenu._id);
  }

  render () {
    const { news: { MainPhoto, Photos, ...news }, changeFontSize, fontSize, interest, topics, triplet } = this.props;
    const settings = {
      axis: 'horizontal',
      autoPlay: true,
      emulateTouch: true,
      showArrows: true,
      showStatus: false,
      showThumbs: true,
      showIndicators: false
    };
    const randomKey = news.sn % 3;
    const imgApi = 'https://imgapiv2.nownews.com/?h=570&q=70&src=';
    const socialProps = {
      img: MainPhoto && MainPhoto.url,
      title: news.title,
      url: news.parseUrl
    };

    return (
      <Container>
        <div className={css(styles.SlideBox)}>
          <Carousel {...settings}>
            {Photos.map(({ desc, sn, url }) => (
              <div className={css(styles.contentDiv)} key={sn}>
                <img className={css(styles.contentImg)} src={`${imgApi}${url}`} />
                <p className={css(styles.imgDesc)}>{desc}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <Margin10 className='clearfix'>
          <LeftSide>
            <Content content={news.content} fontSize={fontSize} />
            {news.freeContent && <div dangerouslySetInnerHTML={{__html: news.freeContent}} />}
            <Tags tags={news.Tags} />
            <Social {...socialProps} />
            <ThermometerSm onWarm={this.onWarm} />
            <RelatedContent type='相關新聞' list={news.relations} randomKey={randomKey} />
            <RelatedContent type='你可能會喜歡' list={interest.slice(randomKey, 3)} randomKey={randomKey} />
            <RecommendAds />
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <Ad300x250 />
            <Thermometer pv={news.pageView.totalScore} onWarm={this.onWarm} />
            <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
            <Ad300x250 />
            <SpecialTopicNav list={topics} />
            <Ad300x250 />
          </RightSide>
        </Margin10>
      </Container>
    );
  }
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

ContentForPhoto.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  interest: PropTypes.array.isRequired,
  news: PropTypes.object.isRequired,
  onWarm: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForPhoto;
