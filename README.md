cantina-auth-twitter
=====================

Twitter authentication for Cantina.

Dependencies
------------
- **auth** - Authentication support provided by [cantina-auth](https://github.com/cantina/cantina-auth)

Adds Middleware
---------------
- Twitter authentication middleware under the `authURL` route.

Configuration
-------------
- **successRedirect** - Where to redirect after the authentication succeeds.
- **failureRedirect** - Where to redirect if the authentication fails.
- **consumerKey** - Twitter consumer key.
- **consumerSecret** - Twitter consumer secret.
- **callbackURL** - Callback URL (publicly accessible) for authentication.
- **authURL** - A path to initiation the authentication process.

**Defaults**
```js
{
  'auth-twitter': {
    successRedirect: '/',
    failureRedirect: '/',
    authURL: '/login'
  }
}
```

Usage
-----
Your application MUST provide handlers for serializing, deserializing, and verifying users.
- `app.serializeUser`
- `app.deserializeUser`
- `app.verifyTwitterUser`

Example
-------
```js
var app = require('cantina').createApp();

app.boot(function(err) {
  if (err) return console.error(err);

  app.conf.set('http:port', 3000);
  app.conf.set('auth-twitter', {
    consumerKey: 'consumer key here',
    consumerSecret: 'consumer secret here',
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
  app.require('cantina-auth-twitter');

  app.start(function(err) {
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
});
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
