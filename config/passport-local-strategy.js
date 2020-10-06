const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding the user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
                // null as no err occured and false as the user is not found
            }

            return done(null, user)
            // return user as we have found the user
        });
    }

));


// serilizing to decide which user is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserilizing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding the user --> Passport');
            return done(err);
        }

        done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in paas on the request to next function (controller's action)
    if (req.isAuthenticated())
        return next();

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated())
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;

    next();

}

module.exports = passport;