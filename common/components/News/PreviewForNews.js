import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Content, Tags } from './NewsContent';
import { Container, LeftSide, Margin10 } from '../Layout';

const PreviewForNews = ({ news }) => {
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <img className={css(styles.contentImg)} src={news.MainPhoto.url} />
      </div>
      <i>{news.MainPhoto.desc}</i>
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
  news: PropTypes.object.isRequired
};

export default PreviewForNews;
