var app = require('cantina'),
    TwitterStrategy = require('passport-twitter').Strategy,
    url = require('url')
  , conf;

if (!app.middleware) {
  throw new Error('Middleware stack not found on app.middlware');
}

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