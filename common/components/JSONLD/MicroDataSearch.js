/* eslint-disable */
import React from 'react';

const MicroDataSearch = () => {
  const data = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "NOWnews今日新聞",
      "alternateName": ["NOWnews今日新聞","NOWnews"],
      "url": "https://www.nownews.com",
      "keywords": ["NOWnews","NOWnews今日新聞"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.nownews.com/search?keyword={search_term_string}&timeRange=lastWeek&page=1",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "http://schema.org",
        "@id": "https://www.nownews.com",
        "@type": "Organization",
        "name": "NOWnews今日新聞",
        "url": "https://www.nownews.com/",
        "logo": "https://www.nownews.com/logo.png",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+886-2-87978775",
                "contactType": "customer service",
                "areaServed": [ "TW" ]
            }
        ],
        "sameAs": [
            "https://zh.wikipedia.org/zh-tw/NOWnews_%E4%BB%8A%E6%97%A5%E6%96%B0%E8%81%9E",
            "https://www.youtube.com/user/NOWnewscom",
            "https://www.facebook.com/nownews",
            "https://www.instagram.com/nownews/",
            "http://weibo.com/nownews",
            "https://twitter.com/NOWnews_TW"
        ]
    },
    {
      "@context":"http://schema.org",
      "@type":"BreadcrumbList",
      "itemListElement":[
       {
        "@type":"ListItem",
        "position":1,
        "item":{
         "@id":"https://www.nownews.com",
         "name":"NOWnews今日新聞"
        }
       }
      ]
    }
  ]
  return (
    <script type='application/ld+json'
      dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g, '\\u003c')}} />
  );
};



export default MicroDataSearch;
