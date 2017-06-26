import http from 'http';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import throng from 'throng';
import url from 'url';
import isomorphicCookie from 'isomorphic-cookie';
import axios from 'axios';
import _ from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import { StyleSheetServer } from 'aphrodite/no-important';
import Helm from 'react-helmet'; // because we are already using helmet
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../tools/webpack.client.dev';
import { compileDev, startDev } from '../tools/dx';
import { configureStore } from '../common/store';
import createRoutes from '../common/routes/root';
import configLib from 'config';

import redirect from './redirect';

const defaultServerConfig = configLib.get('server');
const isProdMode = configLib.get('isProdMode');
const webApiServer = configLib.get('webApiServer');
const memberApiServer = configLib.get('memberApiServer');
const headers = configLib.get('headers');

export const createServer = (config) => {
  const __PROD__ = isProdMode;

  const app = express();
  let assets = null;
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (__PROD__) {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    if (__PROD__) {
      assets = require('../assets.json');
    }
  } else {
    app.use(morgan('dev'));
    const compiler = compileDev((webpack(webpackConfig)), config.port);
    app.use(webpackDevMiddleware(compiler, {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
  }

  app.use(express.static('public', { etag: 1000, maxage: 86400000 * 365 }));

  app.use(redirect(app));

  // ============= sitemap stert =============
  let xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  let xmlnsNews = 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';

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
        <news:title>${news.title}</news:title>
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
    axios.get(`${webApiServer}/sitemap/googleSSL?device=desktop`, {
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
  app.get('/newsSitemap.xml', (req, res) => {
    axios.get(`${webApiServer}/sitemap/newsSitemap?device=desktop`, {
      headers: { 'X-NOWnews-API': 'YouCanSeeMeJohnCena' }
    }).then((result) => {
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
  // ============= sitemap end =============

  // process login
  app.get('/api/oauth_callback', (req, res) => {
    const { token } = req.query;
    axios.get(`${memberApiServer}/api/member`, {
      headers: { 'X-NOWnews-Member': token }
    }).then((result) => {
      const { id, ...user } = result.data;
      isomorphicCookie.save('NOW_member', id, { secure: false }, res);
      isomorphicCookie.save('NOW_memberData', { token, ...user }, { secure: false }, res);
      return res.redirect('/');
    }).catch((error) => {
      return res.redirect(`/auth/oauth?msg=${error.response.data.message}`);
    });
  });

  app.get('*', (req, res) => {
    const user = isomorphicCookie.load('NOW_memberData', req);
    const fontSize = isomorphicCookie.load('NOW_fontSize', req) || 16;
    const store = configureStore({
      sourceRequest: {
        headers,
        apiServ: webApiServer,
        local: {
          fontSize,
          path: url.parse(req.url).pathname,
          query: req.query,
          user
        },
        memberServ: memberApiServer
      }
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(req.originalUrl);
    const { dispatch } = store;

    match({routes, history}, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }

      if (!renderProps) {
        return res.redirect('/');
      }

      const { components } = renderProps;
      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        fontSize,
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        user,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      };

      trigger('fetch', components, locals)
        .then(() => {
          const initialState = store.getState();
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          // just call html = ReactDOM.renderToString(InitialView)
          // to if you don't want Aphrodite. Also change renderFullPage
          // accordingly
          const data = StyleSheetServer.renderStatic(
            () => ReactDOM.renderToString(InitialView)
          );
          const head = Helm.rewind();
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="zh-Hant">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/favicon.ico">
                ${head.meta.toString()}
                ${head.link.toString()}
                <style>
                  html {
                    box-sizing: border-box
                  }

                  *,
                  *::before,
                  *::after {
                    box-sizing: border-box
                  }

                  html {
                    font-size: 100%;
                    -ms-overflow-style: scrollbar;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    height: 100%;
                  }

                  body {
                    font-size: 1rem;
                    background-color: #ffffff;
                    color: #555;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-family: 微軟正黑體,Arial,sans-serif;
                  }

                  h1,h2,h3,h4,h5,h6 {
                    margin: 0;
                    padding: 0;
                  }

                  article img {
                    width: 100%;
                  }

                </style>
                <style data-aphrodite>${data.css.content}</style>
              </head>
              <body>
                <div id="root">${data.html}</div>
                <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
                <script src="${__PROD__ ? assets.vendor.js : '/vendor.js'}"></script>
                <script async src="${__PROD__ ? assets.main.js : '/main.js'}" ></script>
              </body>
            </html>
          `);
        }).catch(e => console.log(e));
    });
  });

  const server = http.createServer(app);

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (defaultServerConfig.timeout) {
    server.setTimeout(defaultServerConfig.timeout, (socket) => {
      const message = `Timeout of ${defaultServerConfig.timeout}ms exceeded`;

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message
      ].join(`\r\n`));
    });
  }

  return server;
};

export const startServer = (serverConfig) => {
  const config = {...defaultServerConfig, ...serverConfig};
  const server = createServer(config);
  server.listen(config.port, (err) => {
    if (isProdMode) {
      if (err) console.log(err);
      console.log(`server ${config.id} listening on port ${config.port}`);
    } else {
      startDev(config.port, err);
    }
  });
};

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  });
}
