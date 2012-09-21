var app = require('cantina');

app.load(function(err) {
  if (err) return console.error(err);

  app.conf.set('http:port', 3000);
  app.conf.set('auth-twitter', {
    consumerKey: 'fxQRQBiuNiBW24oHV8q1A',
    consumerSecret: 'ovfXjjkjTAndhUwfgwu3tflrydIZXukjXn7w4PGk8',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    authURL: '/login'
  });

  require(app.plugins.http);
  require(app.plugins.middleware);
  require('cantina-redis');
  require('cantina-session');
  require('cantina-auth');
  require('../');

  app.on('auth:serialize', function(user) {
    return user;
  });
  app.on('auth:deserialize', function(obj) {
    return obj;
  });
  app.on('auth-twitter:verfiy', function(token, tokenSecret, profile) {
    return profile;
  });

  app.init(function(err) {
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
