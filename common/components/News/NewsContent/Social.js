import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome from 'react-fontawesome';

const Social = ({ img, title, url }) => {
  const completeUrl = `https://www.nownews.com${url}`;
  const appkey = ''; // 暫無 webio appkey
  const socialList = [
    { icon: 'facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${completeUrl}` },
    { icon: 'weibo', url: `http://service.weibo.com/share/share.php?url=${completeUrl}&title=${title}&pic=${img}&appkey=${appkey}` },
    { icon: 'google', url: `https://plus.google.com/share?url=${completeUrl}` }, // hidden google
    { icon: 'twitter', url: `https://twitter.com/intent/tweet?text=${title}&url=${completeUrl}&via=NOWnews_TW` }
  ];

  const onPopup = (url) => {
    window.open(url, 'Share to ...', 'status = 1, height = 500, width = 500, resizable = 0');
  };

  return (
    <div className={css(styles.box)}>
      <iframe src={`https://www.facebook.com/plugins/like.php?locale=zh_TW&href=${completeUrl}&width=50&layout=button_count&action=like&size=small&show_faces=false&share=false&height=21&appId=132863386747341`}
        width='80' height='21' style={{border: 'none', overflow: 'hidden'}} scrolling='no' frameBorder='0' allowTransparency='true' />
      { socialList.map(({ icon, url }) =>
        <a className={css(styles.btnSocial, styles[icon])} key={icon} onClick={() => onPopup(url)}>
          <FontAwesome className={css(styles.icon)} size='2x' name={icon} />
        </a>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    textAlign: 'center'
  },
  btnSocial: {
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-block',
    height: 40,
    marginRight: 8,
    width: 40
  },
  icon: {
    marginTop: 5
  },
  facebook: {
    background: '#3B5A97'
  },
  weibo: {
    background: '#D52C31'
  },
  google: {
    background: '#DA4D3F'
  },
  twitter: {
    background: '#00aced'
  }
});

Social.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Social;
