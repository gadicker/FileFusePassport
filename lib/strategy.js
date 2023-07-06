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
  options.authorizationURL = options.authorizationURL || 'http://localhost:4200/api/oauth2/hitsend/auth';
  options.tokenURL = options.tokenURL || 'https://login.HitSend.com/oauth2/hitsend/token';

  console.log('<<<<< hitsend Strat >>>>>');
  OAuth2Strategy.call(this, options, verify);
  this.name = 'HitSend';
  this._oauth2._useAuthorizationHeaderForGET = true;
}

util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from HitSend.
 *
 * This function constructs a profile from the HitSend metadata call:
 *
 *   - `provider`	set to `HitSend`
 *   - `id`		the user's HitSend ID
 *   - `
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  console.log('<<<<< in hitsendStrategy >>>>>')
  this._oauth2.get('http://localhost:4200/api/oauth2/hitsend/auth', accessToken, function (err, body, res) {
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user', err));
    }

    try {
      var json = JSON.parse(body);

      var profile = { provider: 'HitSend' };
      
      if (json.login && json.login.login_id) {
        profile.id = json.login.login_id
      }
      
      profile.accessToken = accessToken;
      profile.api_endpoint = json.api_endpoint;
      profile.login_url = json.login_url;
      profile.accountname = json.accountname;
      profile.role = json.role;
      profile.dc = json.dc;

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch (e) {
      done(e);
    }
  });
}

module.exports = Strategy;