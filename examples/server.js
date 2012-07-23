var cantina = require('cantina'),
    auth = require('cantina-auth'),
    plugin = require('../').plugin;

var app = cantina.createApp({
  amino: false,
  port: 3000
});

app.use(auth.plugin, {
  serializeUser: function(user, done) {
    console.log(user);
    done(null, user);
  },
  deserializeUser: function(obj, done) {
    done(null, obj);
  }
});

app.use(plugin, {
  consumerKey: 'fxQRQBiuNiBW24oHV8q1A',
  consumerSecret: 'ovfXjjkjTAndhUwfgwu3tflrydIZXukjXn7w4PGk8',
  callbackURL: 'http://localhost:3000/auth/twitter/callback',
  authURL: '/login',
  verify: function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
});

app.router.get('/', function() {
  this.res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  if (this.req.isAuthenticated()) {
    this.res.end('Welcome, <a href="https://twitter.com/' + this.req.user.username + '">' + this.req.user.displayName + '</a>!');
  }
  else {
    this.res.end('<a href="/login">click here to login via Twitter</a>');
  }
});

app.start();
