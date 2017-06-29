import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Content = ({ content, fontSize, freeContent }) => (
  <div>
    <article
      className={css(styles.box)}
      dangerouslySetInnerHTML={{__html: content}}
      style={{ fontSize }} />
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
