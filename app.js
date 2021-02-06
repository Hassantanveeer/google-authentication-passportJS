const express = require('express');
const auth = require('./routes/auth-routes');
const profileAuth = require('./routes/profile-routes');

const passportSetup = require('./config/passport-setup');
const moongoose = require('mongoose');
const cookieSession = require('cookie-session');

const passport = require('passport');
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['hgkhgkhgfjg']
}));

app.use(passport.initialize());
app.use(passport.session());

moongoose.connect('mongodb+srv://hassan123:hassan123@cluster0.ildhw.mongodb.net/cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb');
})

app.use('/auth', auth);

app.use('/profile', profileAuth);

app.listen(3000, () => {
    console.log('app is now listening');
});

app.get('/', (req, res) => {
    res.render('home',{user:req.user});
})