var cantina = require('cantina');

var authHelpers = {
  name: 'authHelpers',
  init: function(app, done) {
    app.serializeUser = function(user, done) {
      console.log(user);
      done(null, user);
    };
    app.deserializeUser = function(obj, done) {
      done(null, obj);
    };
    app.verifyTwitter = function(token, tokenSecret, profile, done) {
      done(null, profile);
    };
    done();
  }
};

var plugins = [
  'http',
  'middleware',
  'cantina-redis',
  'cantina-session',
  authHelpers,
  'cantina-auth',
  '../'
];

var conf = {
  'http': { port: 3000 },
  'auth-twitter': {
    consumerKey: 'fxQRQBiuNiBW24oHV8q1A',
    consumerSecret: 'ovfXjjkjTAndhUwfgwu3tflrydIZXukjXn7w4PGk8',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    authURL: '/login'
  }
};

cantina.createApp(plugins, conf, function(err, app) {
  if (err) return console.log(err);

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
