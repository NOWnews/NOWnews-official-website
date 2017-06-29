import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Carousel } from 'react-responsive-carousel';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { SpecialTopicNav, TripletNav } from '../News';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';
import { DFP } from '../Ad';
import FacebookProvider, { Comments } from 'react-facebook';

class ContentForPhoto extends PureComponent {

  constructor (props) {
    super(props);
    this.onWarm = this.onWarm.bind(this);
  }

  onWarm () {
    const { news, onWarm } = this.props;
    onWarm(news._id, news.MainMenu._id);
  }

  render () {
    // const { ads, adType, news: { MainPhoto, Photos, ...news }, changeFontSize, fontSize, interest, topics, triplet } = this.props;
    const { ads, adType, news: { MainPhoto, Photos, ...news }, changeFontSize, fontSize, topics, triplet } = this.props;
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
            <Content content={news.content} fontSize={fontSize} freeContent={news.freeContent} />
            <Tags tags={news.Tags || []} />
            <Social {...socialProps} />
            <ThermometerSm onWarm={this.onWarm} />
            <FacebookProvider appId='132863386747341' language='zh_TW'>
              <Comments href={`http://www.nownews.com${news.parseUrl}`} />
            </FacebookProvider>
            <RelatedContent type='相關新聞' list={news.relations} adKey={randomKey} ad={ads.relation} />
            {/* <RelatedContent type='你可能會喜歡' list={interest.slice(randomKey, 3)} adKey={randomKey} ad={ads.like} /> */}
            <RecommendAds ads={ads.recommand} />
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <DFP opts={[`/5799246/Nownews_${adType}_article_300x250_RT_new2`, [300, 250]]} />
            <Thermometer pv={news.pageView ? news.pageView.totalScore : 0} onWarm={this.onWarm} />
            <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
            <DFP opts={[`/5799246/Nownews_${adType}_article_300x250_RM_new2`, [300, 250]]} />
            <SpecialTopicNav list={topics} />
            <DFP opts={[`/5799246/Nownews_${adType}_article_300x250_RB_new2`, [300, 250]]} />
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
    width: 'auto !important',
    maxWidth: 970
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
  ads: PropTypes.object,
  adType: PropTypes.string.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  // interest: PropTypes.array.isRequired,
  news: PropTypes.object.isRequired,
  onWarm: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForPhoto;
