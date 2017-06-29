module.exports = function (app) {


  app.get('/n/:yyyy/:mm/:dd/:sn', (req, res) => {
    let queryString = '';
    const { yyyy, mm, dd, sn } = req.params;
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/news/${yyyy}${mm}${dd}/${sn}${queryString}`);
  });

  app.get('/cat/:mainCategory/:childCategory', (req, res) => {
    let queryString = '';
    const { childCategory } = req.params;
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/cat/${childCategory}${queryString}`);
  });

  app.get('/lyLive', (req, res) => {
    let queryString = '';
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/lylive/1${queryString}`);
  });

  app.get('/v', (req, res) => {
    let queryString = '';
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/video/instant${queryString}`);
  });

  app.get('/v/:yyyy/:mm/:dd/:sn', (req, res) => {
    let queryString = '';
    const { yyyy, mm, dd, sn } = req.params;
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/news/${yyyy}${mm}${dd}/${sn}${queryString}`);
  });

  app.get('/search/:keyword', (req, res) => {
    res.redirect(301, `/search?keyword=${req.params.keyword}&timeRange=lastWeek`);
  });

  return function (req, res, next) {
    return next();
  };
};
