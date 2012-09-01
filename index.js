var TwitterStrategy = require('passport-twitter').Strategy,
    url = require('url');

module.exports = {
  name: 'auth-twitter',

  defaults: {
    successRedirect: '/',
    failureRedirect: '/'
  },

  init: function(app, done) {
    var conf = app.conf.get('auth-twitter');

    if(!app.verifyTwitter) {
      throw new Error('Your app must provide a verifyTwitter callback');
    }
    if(!conf.callbackURL) {
      throw new Error('Your app must provide a callbackURL');
    }

    app.passport.use(new TwitterStrategy(conf, app.verifyTwitter));

    if (conf.authURL) {
      app.middleware.add(conf.authURL, app.passport.authenticate('twitter', conf));
    }

    app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('twitter', conf));

    done();
  }
};