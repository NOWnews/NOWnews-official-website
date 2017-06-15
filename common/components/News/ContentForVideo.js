import React, { Component, PropTypes } from 'react';
import {
  Content, FontSize, RelatedContent, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { TripletNav, VideoPlayer } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

class ContentForVideo extends Component {

  constructor (props) {
    super(props);
    this.onWarm = this.onWarm.bind(this);
  }

  onWarm () {
    const { news, onWarm } = this.props;
    onWarm(news._id, news.MainMenu._id);
  }

  render () {
    const { news, changeFontSize, fontSize, triplet } = this.props;
    const { freeContent, MainPhoto, MainVideo, parseUrl, title } = news;
    const randomKey = news.sn % 3;
    const socialProps = {
      img: MainPhoto && MainPhoto.url,
      title,
      url: parseUrl
    };

    return (
      <Container>
        <VideoPlayer src={MainVideo.url} poster={MainPhoto.url} />
        <i>{MainVideo && MainVideo.desc}</i>
        <Margin10 className='clearfix'>
          <LeftSide>
            <Content content={news.content} fontSize={fontSize} />
            {freeContent && <div dangerouslySetInnerHTML={{__html: freeContent}} />}
            <Tags tags={news.Tags} />
            <Social {...socialProps} />
            <ThermometerSm onWarm={this.onWarm} />
            <RelatedContent type='相關新聞' list={news.relations} randomKey={randomKey} />
            {/* <HotVideoBlocks list={news.relations} /> */}
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <Ad300x250 />
            <Thermometer pv={1} onWarm={this.onWarm} />
            <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
          </RightSide>
        </Margin10>
      </Container>
    );
  }
};

ContentForVideo.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  onWarm: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForVideo;
