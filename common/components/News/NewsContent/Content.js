import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Content = ({ content, fontSize, freeContent }) => (
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
    `}</style>
    <article
      className={`${css(styles.box)} fontSize${fontSize}`}
      dangerouslySetInnerHTML={{__html: content}} />
    {freeContent && <div dangerouslySetInnerHTML={{__html: freeContent}} />}
  </div>
);

const styles = StyleSheet.create({
  box: {
    lineHeight: '2em',
    maxWidth: '650px',
    paddingRight: '1rem'
  }
});

Content.propTypes = {
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  freeContent: PropTypes.string
};

export default Content;
