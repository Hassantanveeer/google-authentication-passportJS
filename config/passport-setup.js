const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/user-models');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

passport.use(
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: "19247581673-fevmb2m08pvm7u4tc4jcark9pp1422sc.apps.googleusercontent.com",
        clientSecret: "7DUlqIv0BCJYp2mcWSvaVCZ1"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log('user is ' + currentUser);
                done(null, currentUser);

            }
            else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture

                }).save().then((newUser) => {
                    console.log('new user' + newUser);
                    done(null, newUser)
                });
            }
        });

    })
)