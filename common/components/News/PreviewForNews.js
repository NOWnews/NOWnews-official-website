import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Content, FontSize, Tags } from './NewsContent';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';

const PreviewForNews = ({ news, changeFontSize, fontSize }) => {
  const imgApi = `https://imgapiv2.nownews.com/?h=545&q=70&src=`;
  const imgUrl = (news.MainPhoto.url) ? `${imgApi}${news.MainPhoto.url}` : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <img className={css(styles.contentImg)} src={imgUrl} />
      </div>
      <i>{news.MainPhoto && news.MainPhoto.desc}</i>
      <Margin10 className='clearfix'>
        <LeftSide>
          <Content content={news.content} fontSize={fontSize} freeContent={news.freeContent} />
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
  contentImg: {
    height: 545,
    width: 'auto'
  },
  contentDiv: {
    textAlign: 'center',
    background: '#f1f2f3',
    height: 545
  }
});

PreviewForNews.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default PreviewForNews;
