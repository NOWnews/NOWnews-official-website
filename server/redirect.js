module.exports = function (app) {

  let queryString = '';

  app.get('/n/:yyyy/:mm/:dd/:sn', (req, res) => {
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
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/lylive/1${queryString}`);
  });

  app.get('/v', (req, res) => {
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/video/instant${queryString}`);
  });

  app.get('/v/:yyyy/:mm/:dd/:sn', (req, res) => {
    const { yyyy, mm, dd, sn } = req.params;
    if(req.query && req.query.from) {
      queryString = `?from=${req.query.from}`;
    }
    if(req.query && req.query.utm_source) {
      queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
    }
    res.redirect(301, `/news/${yyyy}${mm}${dd}/${sn}${queryString}`);
  });

  return function (req, res, next) {
    return next();
  };
};
