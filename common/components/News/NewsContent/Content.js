import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DFP } from '../../Ad';

const Content = ({ hasAd, adIndex, content, fontSize, freeContent }) => {
  const content1 = hasAd ? content.substring(0, adIndex) : content;
  const content2 = hasAd ? content.substring(adIndex, content.length) : null;
  return (
    <div>
      <style>{`
          .fontSize24 {
            font-size: 24px;
          }
          .fontSize20 {
            font-size: 20px;
          }
          .fontSize16 {
            font-size: 16px;
          }
          .fontSize24 span {
            font-size: 24px!important;
          }
          .fontSize20 span {
            font-size: 20px!important;
          }
          .fontSize16 span {
            font-size: 16px!important;
          }
          .imgdesc img {
            padding-bottom: 7px;
          }
          .imgdesc {
            line-height: 130%;
            color: #585a56;
          }
      `}</style>
      <article className={`${css(styles.box)} fontSize${fontSize}`}>
        <div dangerouslySetInnerHTML={{__html: content1}} />
        {hasAd && <DFP className={css(styles.contentAd)} opts={['/5799246/Nownews_all_article_300x250_artm', [300, 250]]} />}
        {hasAd && <div dangerouslySetInnerHTML={{__html: content2}} />}
      </article>
      {freeContent && <div dangerouslySetInnerHTML={{__html: freeContent}} />}
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    lineHeight: '2em',
    maxWidth: '650px',
    paddingRight: '1rem'
  },
  contentAd: {
    margin: '0 190px'
  }
});

Content.propTypes = {
  adIndex: PropTypes.number,
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  freeContent: PropTypes.string,
  hasAd: PropTypes.bool
};

export default Content;
