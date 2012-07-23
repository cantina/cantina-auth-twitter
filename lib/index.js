/**
 * Cantina Auth Twitter
 * --------------------
 *
 * Twitter authentication plugin for Cantina.
 *
 * @module cantina
 * @submodule auth-twitter
 * @main auth-twitter
 */

// Modules dependencies.
var utils = require('cantina-utils');

// Export sub-modules.
utils.lazy(exports, __dirname, {
  plugin: './plugin'
});
