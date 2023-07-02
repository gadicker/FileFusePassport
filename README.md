# Passport-HitSend

[Passport](http://passportjs.org/) strategy for authenticating with [HitSend](http://www.hitsend.io/)
using the OAuth 2.0 API.

This module lets you authenticate using HitSend in your Node.js applications.
By plugging into Passport, HitSend authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Usage

#### Configure Strategy

The HitSend authentication strategy authenticates users using a HitSend
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a app ID, app secret, and callback URL.

    passport.use(new HitSendStrategy({
        clientID: HitSend_APP_ID,
        clientSecret: HitSend_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/HitSend/callback"
      }, function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ HitSendId: HitSend.id }, function(err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'HitSend'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/HitSend', passport.authenticate('HitSend'));

    app.get('/auth/HitSend/callback',
      passport.authenticate('HitSend', { failureRedirect: '/login' }),
      function(req, res) {
        // Successul authentication, redirect home.
        res.redirect('/');
      });

## Credits

Created by [Gary Dickerson](http://github.com/gadicker)

Code based on passport-mailchimp by [Brian Falk](http://github.com/brainflake)

## License

[The MIT License](http://opensource.org/licenses/MIT)