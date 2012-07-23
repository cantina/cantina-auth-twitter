/**
 * Twitter authentication provider plugin.
 *
 * @module cantina
 * @submodule auth-twitter
 */

// Module dependencies.
var utils = require('cantina-utils'),
    TwitterStrategy = require('passport-twitter').Strategy;

// Expose this service's package info.
utils.pkginfo(module);

/**
 * @method attach
 * @param optons {Object} Plugin options.
 */
module.exports.attach = function(options) {
  this.passport.use(new TwitterStrategy(options, options.verify));
  this.utils.defaults(options, {
    successRedirect: '/',
    failureRedirect: '/'
  });

  if (options.authURL) {
    this.middleware(options.authURL, this.passport.authenticate('twitter'));
  }
  this.middleware(options.callbackURL, this.passport.authenticate('twitter', options));
};
