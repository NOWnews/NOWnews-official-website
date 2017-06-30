import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Content, FontSize, Social, Tags } from './NewsContent';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';
import { DFP } from '../Ad';
import FacebookProvider, { Comments } from 'react-facebook';

class ContentForCustomColumn extends PureComponent {

  render () {
    const { news, changeFontSize, fontSize } = this.props;
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
            <FacebookProvider appId='132863386747341' language='zh_TW'>
              <Comments href={`http://www.nownews.com${news.parseUrl}`} />
            </FacebookProvider>
          </LeftSide>
          <RightSide>
            <Social {...socialProps} />
            <FontSize changeFontSize={changeFontSize} />
            <DFP opts={[`/5799246/column_300x250_au_${news.templateAD}`, [[300, 250], [300, 600]]]} />
            <DFP opts={[`/5799246/column_300x250_ad_${news.templateAD}`, [[300, 600], [300, 250]]]} />
            <DFP opts={[`/5799246/column_300x250_am_${news.templateAD}`, [[300, 600], [300, 250]]]} />
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

ContentForCustomColumn.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default ContentForCustomColumn;
