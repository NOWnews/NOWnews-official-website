import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Content, FontSize, Tags } from './NewsContent';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';

const PreviewForNews = ({ news, changeFontSize, fontSize }) => {
  const width = (news.MainPhoto.width > 970) ? 970 : news.MainPhoto.width;
  const imgApi = `https://imgapiv2.nownews.com/?w=${width}&q=70&src=`;
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <span className={css(styles.contentImg)}
          style={{
            backgroundImage: `url(${imgApi}${news.MainPhoto.url})`,
            fontSize
          }} />
      </div>
      <i>{news.MainPhoto && news.MainPhoto.desc}</i>
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
  contentImg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'inline-block',
    backgroundPosition: 'center center',
    width: '100%',
    height: '545px'
  },
  contentDiv: {
    background: '#f1f2f3',
    height: '545px'
  }
});

PreviewForNews.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default PreviewForNews;
