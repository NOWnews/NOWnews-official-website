import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const NewsContent = ({ content }) => (
  <div className={css(styles.box)} dangerouslySetInnerHTML={{__html: content}} />
);

const styles = StyleSheet.create({
  box: {
    lineHeight: '2em',
    maxWidth: '650px',
    paddingRight: '1rem'
  }
});

NewsContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default NewsContent;
