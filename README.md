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
var app = require('cantina');

app.boot(function(err) {
  if (err) return console.error(err);

  app.conf.set('http:port', 3000);
  app.conf.set('auth-twitter', {
    consumerKey: 'consumer key here',
    consumerSecret: 'consumer secret here',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    authURL: '/login'
  });

  app.serializeUser = function(user) {
    return user;
  };
  app.deserializeUser = function(obj) {
    return obj;
  };
  app.verifyTwitterUser = function(token, tokenSecret, profile) {
    return profile;
  };

  require('cantina-web');
  require('cantina-redis');
  require('cantina-session');
  require('cantina-auth');
  require('../');

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
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2012 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
