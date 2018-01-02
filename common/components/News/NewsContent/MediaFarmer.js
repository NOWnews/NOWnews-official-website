import React, { PropTypes } from 'react';

const MediaFarmer = ({ news }) => (
  <div dangerouslySetInnerHTML={{__html: `
    <div id='herbsapi'
      hb-author='${news.newsBy}'
      hb-title='${news.title}'
      hb-width='650'
      hb-height='92'
      hb-icon='/others/media-farmer.png'></div>
  `}} />
);

MediaFarmer.propTypes = {
  news: PropTypes.object.isRequired
};
export default MediaFarmer;
