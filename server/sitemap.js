import configLib from 'config';
import axios from 'axios';
import _ from 'lodash';

module.exports = function (app) {
  const webApiServer = configLib.get('webApiServer');
  const headers = configLib.get('headers');

  const xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  const xmlnsNews = 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';

  let xmlGoogleNews = (news) => {
    return `<url>
      <loc>${news.url}</loc>
      <lastmod>${news.lastmod}</lastmod>
      <changefreq>${news.changefreq}</changefreq>
      <priority>${news.priority}.0</priority>
    </url>`;
  };
  let xmlSitemapNews = (news) => {
    return `<url>
      <loc>${news.url}</loc>
      <news:news>
        <news:publication>
          <news:name>${news.name}</news:name>
          <news:language>${news.language}</news:language>
        </news:publication>
        <news:genres>${news.genres}</news:genres>
        <news:publication_date>${news.publication_date}</news:publication_date>
        <news:title><![CDATA[${news.title}]]></news:title>
      </news:news>
    </url>`;
  };

  app.get('/sitemap.xml', (req, res) => {
    axios.get(`${webApiServer}/sitemap/google?device=desktop`, {
      headers: { 'X-NOWnews-API': 'YouCanSeeMeJohnCena' }
    }).then((result) => {
      let content = '';
      _.forEach(result.data, (news) => {
        content += xmlGoogleNews(news);
      });
      res.header('Content-Type', 'application/xml');
      return res.send(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset ${xmlns}>${content}</urlset>`);
    }).catch((error) => {
      console.error('error', error.response);
      return res.status(500).send('Internal server error');
    });
  });

  app.get('/sitemapSSL.xml', (req, res) => {
    axios.get(`${webApiServer}/sitemap/googleSSL?device=desktop`, { headers })
    .then((result) => {
      let content = '';
      _.forEach(result.data, (news) => {
        content += xmlGoogleNews(news);
      });
      res.header('Content-Type', 'application/xml');
      return res.send(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset ${xmlns}>${content}</urlset>`);
    }).catch((error) => {
      console.error('error', error.response);
      return res.status(500).send('Internal server error');
    });
  });

  app.get('/newsSitemap.xml', (req, res) => {
    axios.get(`${webApiServer}/sitemap/newsSitemap?device=desktop`, { headers })
    .then((result) => {
      let content = '';
      _.forEach(result.data, (news) => {
        content += xmlSitemapNews(news);
      });
      res.header('Content-Type', 'application/xml');
      return res.send(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset ${xmlns} ${xmlnsNews}>${content}</urlset>`);
    }).catch((error) => {
      console.error('error', error.response);
      return res.status(500).send('Internal server error');
    });
  });

  return function (req, res, next) {
    return next();
  };
};

