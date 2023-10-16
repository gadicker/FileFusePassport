var OAuth2Strategy = require('passport-oauth2')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError
  , util = require('util');

/**
 * `Strategy` constructor.
 *
 * HitSend uses the OAuth 2.0 protocol for authentication.
 *
 * Applications using this must supply a callback to verify the credentials which
 * accepts an `accessToken`, `refreshToken`, and a `profile`. After verifying the
 * credentials it should call `done` with the user object and any error that may
 * have occured as the first parameter.
 *
 * Options:
 *   - `clientID`	    your HitSend application's App ID
 *   - `clientSecret`	your HitSend application's App Secret
 *   - `callbackURL`	URL to which HitSend will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new HitSendStrategy({
 *         clientID: 'HITSEND_CLIENT_ID',
 *         clientSecret: 'HITSEND_CLIENT_SECRET',
 *         callbackURL: 'https://www.example.net/auth/HitSend/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'http://localhost:4200/api/partner/auth';
  options.tokenURL = options.tokenURL || 'http://localhost:4200/api/partner/token'
  OAuth2Strategy.call(this, options, verify);
  this.name = 'HitSend';
  this._oauth2._useAuthorizationHeaderForGET = true;
}

util.inherits(Strategy, OAuth2Strategy);


module.exports = Strategy;