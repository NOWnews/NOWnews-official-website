import React, { PropTypes } from 'react';

const MicroDataCategory = ({ category }) => {
  const data = {
    "@context": "{{ news.jsonld.context }}",
    "@type": "{{ news.jsonld.type }}",
    "datePublished": "{{ news.jsonld.datePublished }}",
    "dateModified": "{{ news.jsonld.dateModified }}",
    "mainEntityOfPage": {
        "@type": "{{ news.jsonld.mainEntityOfPage.type }}",
        "@id": "{{ news.jsonld.mainEntityOfPage.id }}"
    },
    "articleBody": "{{ news.jsonld.articleBody }}",
    "headline": "{{ news.jsonld.headline }}",
    "image": {
        "@type": "{{ news.jsonld.image.type }}",
        "url": "{{ news.jsonld.image.url }}",
        "width": "{{ news.jsonld.image.width }}",
        "height": "{{ news.jsonld.image.height }}"
    },
    "author": {
        "@type": "{{ news.jsonld.author.type }}",
        "name": "{{ news.jsonld.author.name }}"
    },
    "publisher": {
        "@type": "{{ news.jsonld.publisher.type }}",
        "name": "{{ news.jsonld.publisher.name }}",
        "logo": {
            "@type": "{{ news.jsonld.publisher.logo.type }}",
            "url": "{{ news.jsonld.publisher.logo.url }}",
            "width": "{{ news.jsonld.publisher.logo.width }}",
            "height": "{{ news.jsonld.publisher.logo.height }}"
        }
    },
    "description": "{{ news.jsonld.description }}"
  };

  return (
    <script type='application/ld+json'>
      {JSON.stringify(data)}
    </script>
  );
};

MicroDataCategory.propTypes = {
  category: PropTypes.object
};

export default MicroDataCategory;
