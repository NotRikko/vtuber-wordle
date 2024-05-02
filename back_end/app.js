const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const cors = require('cors')
const User = require('./models/user')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')

require('dotenv').config();


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log(jwt_payload.id);
  try {
    const user = await User.findOne({ _id: jwt_payload.id });
    
    if (!user) {
      console.log('No user')
      return done(null, false); 
    }
    return done(null, user);
  } catch(err) {
    console.log('Error')
    console.error('Error in JWT authentication:', err);
    return done(err, false);
  }
}));

passport.use(
  new LocalStrategy(async (user_name, password, done) => {
    try {
      const user = await User.findOne({ user_name: user_name});
      if (!user) {
        return done(null, false, { message: "User not found" })
      };
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        return done(null, false, { message: "Incorrect password"})
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);


const usersRouter = require('./routes/users');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
