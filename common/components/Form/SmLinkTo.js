import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

export const SmLinkTo = ({ url, text, isExternal = false }) => {
  return (
    <Link className={css(styles.link)} to={url}
      target={isExternal === true ? '_blank' : null}>
      {text}
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#1886FB',
    fontWeight: 500,
    fontSize: 15,
    textDecoration: 'none',
    ':hover': {
      opacity: 0.6
    }
  }
});

SmLinkTo.propTypes = {
  isExternal: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SmLinkTo;
