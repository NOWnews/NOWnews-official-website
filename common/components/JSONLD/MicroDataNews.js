/* eslint-disable */
import React, { PropTypes } from 'react';

const MicroDataNews = ({ news }) => {
  const data = {
    "@context": "http://schema.org",
	  "@type": "NewsArticle",
	  "datePublished": "2017-06-20T17:43+08:00",
	  "dateModified": "2017-06-20T17:43+08:00",
	  "mainEntityOfPage":{
	    "@type":"WebPage",
	    "@id":"http://www.nownews.com/n/2017/06/20/2571948"
	  },
	  "articleBody": "22歲陳姓女模在今年3月遭姦殺並棄屍在南港的廢棄商場，而凶手正是陳女閨密的男友程宇，引發譁然。當時程宇宣稱和女友梁女一起計畫犯案，過程中梁女更將包包背帶綁住陳女的脖子，而梁女也遭羈押3天。經檢警偵辦後",
	  "headline": "梁女遭誣陷白關3天　檢方列6大原因不起訴",
	  "image": {
	    "@type": "ImageObject",
	    "url": "http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2F3e%2F01%2F3e01a26cadaa0a379e492906eb177b75.jpg",
	    "width": 696,
	    "height": 530
	  },
	  "author": {
	    "@type": "Person",
	    "name": "社會中心／台北報導"
	  },
	   "publisher": {
	    "@type": "Organization",
	    "name": "NOWnews今日新聞",
	    "logo": {
	      "@type": "ImageObject",
	      "url": "http://www.nownews.com/assets/images/logo.png",
	      "width": 220,
	      "height": 52
	    }
	  },
	  "description": "22歲陳姓女模在今年3月遭姦殺並棄屍在南港的廢棄商場，而凶手正是陳女閨密的男友程宇，引發譁然。當時程宇宣稱和女友梁女一起計畫犯案，過程中梁女更將包包背帶綁住陳女的脖子，而梁女也遭羈押3天。經檢警偵辦後"
  };

  return (
    <script type='application/ld+json'>
      {JSON.stringify(data)}
    </script>
  );
};

MicroDataNews.propTypes = {
  news: PropTypes.object
};

export default MicroDataNews;
