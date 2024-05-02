const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
;
let refreshTokens = []

function generateAccessToken(user) {
    return jwt.sign({ id: user }, 'secret', { expiresIn: '15s'})
}

exports.user_post = [
    body('user_name', 'Name must be longer than 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom(async value => {
        const user = await User.findOne({ user_name: value });
        if(user) {
            throw new Error('Username already in use!');
        }
    }),

    body('password')
    .trim()
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long!')
    .custom(value => {
        if (!/\d/.test(value)) {
            throw new Error('Password must contain at least one number!');
        }
        return true;
    })
    .custom(value => {
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          throw new Error('Password must contain at least one special character!');
        }
        return true;
    })
    .escape(),

    body('email')
    .trim()
    .isEmail()
    .custom(async value => {
        const existingEmail = await User.findOne({ email: value });
        if(existingEmail) {
            throw new Error('This email is already taken!');
        }
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);
        const user = new User({
            user_name: req.body.user_name,
            password: hashedPassword,
            email: req.body.email,
            image: 'https://cdn.donmai.us/original/17/71/177179702fa643f0ba8d8c401f5f2a48.jpg',
            current_score: 0,
            high_score: 0,
            admin: false,
        });
        if(!errors.isEmpty()) {
            console.log(errors.array());
            res.json({ errors: errors.array(), created: false})
        } else {
            await user.save();
            console.log('success')
            res.json({ created: true })
        }
    })
]

exports.user_validate = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(err);
        if(err) {
            return next(err);
        }
        if (!user) {
            return res.json( {authenticated: false, message: info.message });
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = jwt.sign({ id: user._id }, 'secret2');
        refreshTokens.push(refreshToken);
        return res.json({ authenticated: true, user, accessToken, refreshToken })
    })(req, res, next)
})

exports.token = asyncHandler(async (req, res, next) => {
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, 'secret2', (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user.id)
        res.json({ accessToken: accessToken })
    })
})

exports.user_session = asyncHandler(async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
});

exports.user_logout = asyncHandler(async (req, rex, next) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})





