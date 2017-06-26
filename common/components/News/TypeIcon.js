import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const TypeIcon = ({ type = 'NEWS', size = 'BI' }) => {
  const ICON_DEFINED = {
    'PHOTO': '/icons/type-photo.png',
    'VIDEO': '/icons/type-video.png'
  };

  if (!ICON_DEFINED[type]) {
    return null;
  }

  return (
    <img className={css(styles.newsType, styles[size])} src={ICON_DEFINED[type]} />
  );
};

const styles = StyleSheet.create({
  newsType: {
    position: 'absolute',
    zIndex: 10
  },
  // For Normal ListItem
  LI: {
    bottom: 20,
    left: 0,
    width: 30
  },
  // For Small ListItem
  LI_S: {
    bottom: 25,
    left: 0,
    width: 25
  },
  // For Normal BlockItem
  BI: {
    top: 90
  }
});

TypeIcon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string
};

export default TypeIcon;
