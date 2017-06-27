/* eslint-disable */
import React, { PureComponent, PropTypes } from 'react';

class MicroDataCategory extends PureComponent {
  render () {
    const { category } = this.props;

    const data = [
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
            "image": "http://www.nownews.com/logo.png"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": `http://www.nownews.com${category.currentMenu.url}`,
            "name": category.currentMenu.name,
            "image": "https://legacy.nownews.com/NOWnews_default/default_terry.jpg"
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

MicroDataCategory.propTypes = {
  category: PropTypes.object
};

export default MicroDataCategory;
