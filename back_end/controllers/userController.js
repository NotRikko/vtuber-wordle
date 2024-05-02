const User = require('../models/user')
const RefreshToken = require('../models/refreshtoken')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


let refreshTokens = []

function generateAccessToken(user) {
    return jwt.sign({ id: user }, accessTokenSecret , { expiresIn: '1d'})
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
            res.json({ created: true })
        }
    })
]
exports.user_validate = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ authenticated: false, message: info.message });
            }
            
            const accessToken = generateAccessToken(user._id);
            const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret);
            
            const newRefreshToken = new RefreshToken({
                token: refreshToken,
                userId: user._id
            });
            await newRefreshToken.save();

            return res.json({ authenticated: true, user, accessToken, refreshToken });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

exports.user_token = asyncHandler(async (req, res, next) => {
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.sendStatus(401);
    const tokenExists = await RefreshToken.findOne({token: refreshToken});
    if(!tokenExists) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
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
        res.status(200).json(user);       
    })(req, res, next);
});

exports.user_logout = asyncHandler(async (req, res, next) => {
    const refreshToken = req.body.token;
    if(!refreshToken) {
        return res.sendStatus(400)
    }
    await RefreshToken.findOneAndDelete({ token: refreshToken })
    res.sendStatus(204);
})

exports.user_change_username = asyncHandler(async (req, res, next) => {
})

exports.user_change_password = asyncHandler(async (req, res, next) => {
    
})




