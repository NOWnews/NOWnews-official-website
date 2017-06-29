/* eslint-disable */
import React, { PureComponent, PropTypes } from 'react';

class MicroDataNews extends PureComponent {
  render () {
    const { news } = this.props;
    const photo = news.MainPhoto && news.MainPhoto.url;
    const data = [
      {
        "@context": "http://schema.org",
    	  "@type": "NewsArticle",
    	  "datePublished": news.startedAt,
    	  "dateModified": news.startedAt,
    	  "mainEntityOfPage":{
    	    "@type":"WebPage",
    	    "@id": `https://www.nownews.com${news.parseUrl}`
    	  },
    	  "articleBody": news.content,
    	  "headline": news.title,
    	  "image": {
    	    "@type": "ImageObject",
    	    "url": photo,
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
    	      "url": "https://www.nownews.com/logo.png",
    	      "width": 220,
    	      "height": 52
    	    }
    	  },
    	  "description": news.summary
      },
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://www.nownews.com",
            "name": "NOWnews今日新聞",
            "image": "https://www.nownews.com/logo.png"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": `https://www.nownews.com${news.MainMenu.url}`,
            "name": news.MainMenu.name,
            "image": "https://legacy.nownews.com/NOWnews_default/default_terry.jpg"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@id": `https://www.nownews.com${news.parseUrl}`,
            "name": news.title,
            "image": photo
          }
        }]
      }
    ]
    return (
      <script type='application/ld+json'
        dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g, '\\u003c')}} />
    );
  };
};

MicroDataNews.propTypes = {
  news: PropTypes.object
};

export default MicroDataNews;
