const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator');

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
        const user = new User({
            user_name: req.body.user_name,
            password: req.body.password,
            email: req.body.email,
            image: 'https://cdn.donmai.us/original/17/71/177179702fa643f0ba8d8c401f5f2a48.jpg',
            current_score: 0,
            high_score: 0,
            admin: false,
        });
        if(!errors.isEmpty()) {
            console.log(errors.array());
            res.send({ errors: errors.array(), created: false})
        } else {
            await user.save();
            res.send({ created: true })
        }
    })
    

]

exports.user_get = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.body.id)
})