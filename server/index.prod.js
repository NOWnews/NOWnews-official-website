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
import React from 'react';
import { renderToString as ReactDOMrenderToString } from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import { StyleSheetServer } from 'aphrodite/no-important';
import { rewind as HelmRewind } from 'react-helmet'; // because we are already using helmet
import { configureStore } from '../common/store';
import createRoutes from '../common/routes/root';
import configLib from 'config';

import redirect from './redirect';
import sitemap from './sitemap';

const defaultServerConfig = configLib.get('server');
const webApiServer = configLib.get('webApiServer');
const memberApiServer = configLib.get('memberApiServer');
const imgApiServer = configLib.get('imgApiServer');
const headers = configLib.get('headers');
const region = configLib.get('region');

export const createServer = (config) => {
  const app = express();
  const assets = require('../assets.json');
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
  app.use(compression());
  app.use(express.static('public', { etag: 1000, maxage: 86400000 * 365 }));

  app.use(redirect(app));
  app.use(sitemap(app));

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
        memberServ: memberApiServer,
        imgServ: imgApiServer
      }
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(req.originalUrl);
    const { dispatch } = store;

    match({routes, history}, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error('router match error', err);
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
            () => ReactDOMrenderToString(InitialView)
          );
          const head = HelmRewind();
          const regexp = / data-react-helmet="true"/g;
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="zh-Hant">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/favicon.ico">
                ${head.meta.toString().replace(regexp, '')}
                ${head.link.toString()}
                <script>
                  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                  ga('create', 'UA-4021556-54', 'auto');
                  ga('create', 'UA-4021556-26', {'name':'26'});
                  if(navigator.userAgent.indexOf('5.65') > -1 || navigator.userAgent.indexOf('5.66') > -1){
                    ga('send', 'pageview');
                    ga('26.send', 'pageview');
                  }
                  ga('require', 'eventTracker', {
                    attributePrefix: 'data-',
                    events: ['click']
                  });
                  var _comscore = _comscore || [];
                  _comscore.push({ c1: "2", c2: "11473067" });
                  (function() {
                    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                    el.parentNode.insertBefore(s, el);
                  })();
                </script>
                <noscript>
                  <img src='http://b.scorecardresearch.com/p?c1=2&c2=11473067&cv=2.0&cj=1' />
                </noscript>
                <script src="/vendor/autotrack-eventTracker.min.js"></script>
                <script type="text/javascript">
                  (function() {
                    var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
                    pa.src = window.location.protocol + "//api.popin.cc/searchbox/nownews.js";
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
                  })();
                </script>
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
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
                <script src="//apps.bdimg.com/libs/moment/2.8.3/moment-with-locales.min.js"></script>
                <script src="//www.gstatic.com/firebasejs/4.2.0/firebase.js"></script>
                <script src="//vjs.zencdn.net/5.20.1/video.min.js"></script>
                <script>window.moment || document.write('<script src="/vendor/moment.min.js"><\\/script>')</script>
                <script>window.videojs || document.write('<script src="/vendor/videojs.min.js"><\\/script>')</script>
                <script>window.firebase || document.write('<script src="/vendor/firebase.min.js"><\\/script>')</script>
                <script src="${assets.vendor.js}"></script>
                <script async src="${assets.main.js}" ></script>
                <link rel='stylesheet' type='text/css' href='/vendor/basscss.min.css' />
                <link rel='stylesheet' type='text/css' href='/vendor/font-awesome-4.7.0/css/font-awesome.min.css' />
                <link rel='stylesheet' type='text/css' href='/vendor/video-js.min.css' />
                <div style="display:none;">Server in ${region}</div>
              </body>
            </html>
          `);
        }).catch((e) => {
          console.log('catch error', e);
          return res.status(500).send('Internal server error');
        });
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
    if (err) console.log(err);
    console.log(`server ${config.id} listening on port ${config.port}`);
  });
};

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  });
}
