import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Content = ({ content }) => (
  <article className={css(styles.box)} dangerouslySetInnerHTML={{__html: content}} />
);

const styles = StyleSheet.create({
  box: {
    lineHeight: '2em',
    maxWidth: '650px',
    paddingRight: '1rem'
  }
});

Content.propTypes = {
  content: PropTypes.string.isRequired
};

export default Content;
