var TwitterStrategy = require('passport-twitter').Strategy,
    url = require('url');

module.exports = function (app) {
  var conf;

  // Dependencies.
  require('cantina-web');

  // Default conf
  app.conf.add({
    'auth-twitter': {
      successRedirect: '/',
      failureRedirect: '/',
      authURL: '/login'
    }
  });

  conf = app.conf.get('auth-twitter');

  if(!conf.callbackURL) {
    throw new Error('Your app must provide a callbackURL');
  }

  app.passport.use(new TwitterStrategy(conf, app.verifyTwitterUser));

  app.middleware.add(conf.authURL, app.passport.authenticate('twitter', conf));
  app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('twitter', conf));
};