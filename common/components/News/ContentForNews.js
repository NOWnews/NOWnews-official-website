import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { SpecialTopicNav, TripletNav } from '../News';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';
import { DFP } from '../Ad';
import FacebookProvider, { Comments } from 'react-facebook';

class ContentForNews extends PureComponent {
  constructor (props) {
    super(props);
    this.onWarm = this.onWarm.bind(this);
  }

  onWarm () {
    const { news, onWarm } = this.props;
    onWarm(news._id, news.MainMenu._id);
  }

  render () {
    const { ads, adType, news, changeFontSize, interest, fontSize, topics, triplet } = this.props;
    const randomKey = news.sn % 3;
    const imgApi = `https://imgapiv2.nownews.com/?h=545&q=70&src=`;
    const imgUrl = (news.MainPhoto && news.MainPhoto.url) ? `${imgApi}${news.MainPhoto.url}` : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
    const socialProps = {
      img: imgUrl,
      title: news.title,
      url: news.parseUrl
    };
    return (
      <Container>
        <div className={css(styles.contentDiv)}>
          <img className={css(styles.contentImg)} src={imgUrl} alt={news.MainPhoto && news.MainPhoto.desc} />
        </div>
        <i>{news.MainPhoto && news.MainPhoto.desc}</i>
        <Margin10 className='clearfix'>
          <LeftSide>
            <Content content={news.content} fontSize={fontSize} freeContent={news.freeContent} />
            <Tags tags={news.Tags || []} />
            <Social {...socialProps} />
            <ThermometerSm onWarm={this.onWarm} />
            <FacebookProvider appId='132863386747341' language='zh_TW'>
              <Comments href={`https://www.nownews.com${news.parseUrl}`} />
            </FacebookProvider>
            <RelatedContent type='相關新聞' list={news.relations} adKey={randomKey} ad={ads.relation} />
            <RelatedContent type='你可能會喜歡' list={interest.slice(randomKey, randomKey + 3)} adKey={randomKey} ad={ads.like} />
            <RecommendAds ads={ads.recommand} />
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <DFP opts={[`/5799246/Nownews_${adType}_article_300x250_RT_new2`, [300, 250]]} />
            <Thermometer pv={news.pageView ? news.pageView.totalScore : 0} onWarm={this.onWarm} />
            <TripletNav {...triplet} />
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
  contentImg: {
    height: 545,
    width: 'auto',
    maxWidth: 970
  },
  contentDiv: {
    textAlign: 'center',
    background: '#f1f2f3',
    height: 545
  }
});

ContentForNews.propTypes = {
  ads: PropTypes.object,
  adType: PropTypes.string.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  interest: PropTypes.array.isRequired,
  news: PropTypes.object.isRequired,
  onWarm: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForNews;
