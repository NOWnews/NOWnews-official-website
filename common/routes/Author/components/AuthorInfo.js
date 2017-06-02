
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome from 'react-fontawesome';

const AuthorInfo = ({ authorData }) => {
  return (
    <div className={`clearfix ${css(styles.authorInfo)}`}>
      <div className={css(styles.imgbox)}>
        { authorData.Avatar ? <img className={css(styles.avatar)} src={authorData.Avatar} />
          : <FontAwesome name='user-circle-o' style={{ color: 'gray', fontSize: '8em' }} />
        }
      </div>

      <p className={css(styles.name)}>{authorData.name}</p>

      {/* <hr className={css(styles.horiLine)} />
      <p>{ authorData.desc ? authorData.desc : '目前沒有介紹' }</p>
      <hr className={css(styles.horiLine)} /> */}
    </div>
  );
};

const styles = StyleSheet.create({
  horiLine: {
    borderTop: '3px dashed #8c8b8b'
  },
  name: {
    fontSize: '1.5em',
    textAlign: 'center'
  },
  imgbox: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
  },
  avatar: {
    minWidth: 150,
    maxWidth: 200
  },
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
