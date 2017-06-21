/* eslint-disable */
import React, { PropTypes } from 'react';

const MicroDataNews = ({ news }) => {
  const data = {
    "@context": "http://schema.org",
	  "@type": "NewsArticle",
	  "datePublished": news.startedAt,
	  "dateModified": news.startedAt,
	  "mainEntityOfPage":{
	    "@type":"WebPage",
	    "@id": `http://www.nownews.com${news.parseUrl}`
	  },
	  "articleBody": news.content,
	  "image": {
	    "@type": "ImageObject",
	    "url": news.MainPhoto.url,
	    "width": 696,
	    "height": 530
	  },
	  "author": {
	    "@type": "Person",
	    "name": news.newsBy
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
	  "description": news.summary
  };
  return (
    <script type='application/ld+json'
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
  );
};

MicroDataNews.propTypes = {
  news: PropTypes.object
};

export default MicroDataNews;
