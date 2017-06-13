import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Social = ({ img, title, url }) => {
  const completeUrl = `https://nownews.com${url}`;
  const appkey = ''; // 暫無 webio appkey
  const socialList = [
    { icon: 'FB', url: `https://www.facebook.com/sharer/sharer.php?u=${completeUrl}` },
    { icon: 'weibo', url: `http://service.weibo.com/share/share.php?url=${completeUrl}&title=${title}&pic=${img}&appkey=${appkey}` },
    { icon: 'twitter', url: `https://twitter.com/intent/tweet?text=${title}&url=${completeUrl}&via=NOWnews_TW` },
    { icon: 'G+', url: `https://plus.google.com/share?url=${completeUrl}` }
  ];

  const onPopup = (url) => {
    window.open(url, 'Share to ...', 'status = 1, height = 500, width = 500, resizable = 0');
  };

  return (
    <div className={css(styles.box)}>
      { socialList.map(({ icon, url }) =>
        <a className={css(styles.btnSocial)} key={icon} target='_blank' onClick={() => { onPopup(url); }}>
          <img className={css(styles.img)} src={`/social/${icon}.png`} alt={icon} />
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
    cursor: 'pointer',
    marginRight: 8
  },
  img: {
    width: 40
  }
});

Social.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Social;
