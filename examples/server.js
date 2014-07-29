var app = require('cantina').createApp();

app.boot(function(err) {
  if (err) return console.error(err);

  app.conf.set('http:port', 3000);
  app.conf.set('auth-twitter', {
    consumerKey: 'JAXZDe4uuLMWYiO4ljlYsA',
    consumerSecret: 'NQ5Pgrfl5kwP3xJG0MnS1RJ7pXVeIcy1h0JLJ2Avs',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    authURL: '/login'
  });

  app.serializeUser = function(user, cb) {
    return cb(null, user.id);
  };
  app.deserializeUser = function(obj, cb) {
    return cb(null, obj);
  };
  app.verifyTwitterUser = function(token, tokenSecret, profile, done) {
    return done(null, profile);
  };

  app.require('cantina-web');
  app.require('cantina-redis');
  app.require('cantina-session');
  app.require('cantina-auth');
  app.require('../');

  app.start(function(err) {
    if (err) return console.error(err);

    app.middleware.get('/', function index(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      if (req.isAuthenticated()) {
        res.end('Welcome, <a href="https://twitter.com/' + req.user.username + '">' + req.user.displayName + '</a>!');
      }
      else {
        res.end('<a href="/login">click here to login via Twitter</a>');
      }
    });
  });
});
