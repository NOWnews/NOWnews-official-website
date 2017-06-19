module.exports = function(app) {

  app.get('/n/:yyyy/:mm/:dd/:sn', (req, res) => {
    const { yyyy, mm, dd, sn } = req.params;
    res.redirect(301, `/news/${yyyy}${mm}${dd}/${sn}`);
  });

  app.get('/cat/:mainCategory/:childCategory', (req, res) => {
    const { mainCategory, childCategory } = req.params;
    res.redirect(301, `/cat/${childCategory}`);
  });

  app.get('/lyLive', (req, res) => {
    res.redirect(301, '/lylive/1');
  });

  app.get('/v', (req, res) => {
    res.redirect(301, '/video/instant');
  });

  app.get('/v/:yyyy/:mm/:dd/:sn', (req, res) => {
    const { yyyy, mm, dd, sn } = req.params;
    res.redirect(301, `/news/${yyyy}${mm}${dd}/${sn}`);
  });


  return function(req, res, next) {
      return next();
  };
};
