
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome from 'react-fontawesome';

const AuthorInfo = ({ authorData }) => {
  return (
    <div className={`clearfix ${css(styles.authorInfo)}`}>
      <FontAwesome name='user-circle-o' size='4x' />
      <h2>{authorData.name}</h2>
    </div>
  );
};

const styles = StyleSheet.create({
  authorInfo: {
    float: 'left',
    height: '100%',
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    width: 200
  }
});

AuthorInfo.propTypes = {
  authorData: PropTypes.object.isRequired
};

export default AuthorInfo;
