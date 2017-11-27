import React, { PureComponent, PropTypes } from 'react';
import FacebookProvider, { Comments } from 'react-facebook';
import {
  Content, FontSize, RelatedContent, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { TripletNav, VideoPlayer } from '../News';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';
import { CTHouse, DFP, GrabBag, OneAdIR } from '../Ad';

class ContentForVideo extends PureComponent {

  constructor (props) {
    super(props);
    this.onWarm = this.onWarm.bind(this);
  }

  onWarm () {
    const { news, onWarm } = this.props;
    onWarm(news._id, news.MainMenu._id);
  }

  render () {
    const { ads, adType, isFirstNews, news, changeFontSize, fontSize, triplet } = this.props;
    const { MainPhoto, MainVideo, completeUrl, title } = news;
    const randomKey = news.sn % 3;
    const socialProps = {
      img: MainPhoto.large,
      title,
      url: completeUrl
    };

    return (
      <Container>
        <VideoPlayer src={MainVideo.url} poster={MainPhoto.large} />
        <i>{MainVideo && MainVideo.desc}</i>
        <Margin10 className='clearfix'>
          <LeftSide>
            <Content content={news.content} fontSize={fontSize} freeContent={news.freeContent}
              adIndex={news.contentAdIndex} hasAd={news.hasContentAd} />
            {adType === 'life' && <iframe frameBorder='0' width='95%' height='460' scrolling='no' src='https://legacy.nownews.com/ad2004/171127-184628-7972h.html' />}
            <Tags tags={news.Tags || []} />
            <Margin10>
              <DFP opts={[`/5799246/Nownews_${adType}_article_600x225_i_new2`, [600, 225]]} />
            </Margin10>
            <Social {...socialProps} />
            <ThermometerSm onWarm={this.onWarm} />
            {isFirstNews && <OneAdIR />}
            <FacebookProvider appId='132863386747341' language='zh_TW'>
              <Comments href={news.completeUrl} />
            </FacebookProvider>
            <RelatedContent type='相關新聞' list={news.relations} adKey={randomKey} ad={ads.relation} />
            <div className='_popIn_recommend' data-url={`https://www.nownews.com${news.parseUrl}`} />
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <DFP opts={[`/5799246/Nownews_${adType}_article_300x250_RT_new2`, [300, 250]]} />
            <Thermometer pv={news.pageView ? news.pageView.totalScore : 0} onWarm={this.onWarm} />
            <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
            <Margin10><GrabBag list={ads.grabBag} /></Margin10>
            <CTHouse />
          </RightSide>
        </Margin10>
      </Container>
    );
  }
};

ContentForVideo.propTypes = {
  ads: PropTypes.object,
  adType: PropTypes.string.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  isFirstNews: PropTypes.bool.isRequired,
  onWarm: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForVideo;
