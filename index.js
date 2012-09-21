var app = require('cantina'),
    TwitterStrategy = require('passport-twitter').Strategy,
    url = require('url');

app.conf.add({
  'auth-twitter': {
    successRedirect: '/',
    failureRedirect: '/',
    authURL: '/login'
  }
});

app.on('init', function() {
  var conf = app.conf.get('auth-twitter');

  if(!conf.callbackURL) {
    throw new Error('Your app must provide a callbackURL');
  }

  app.passport.use(new TwitterStrategy(conf, app.invoke.bind(app, 'auth-twitter:verify')));

  app.middleware.add(conf.authURL, app.passport.authenticate('twitter', conf));
  app.middleware.add(url.parse(conf.callbackURL).path, app.passport.authenticate('twitter', conf));
});