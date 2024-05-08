const User = require('../models/user')
const asyncHandler = require('express-async-handler')

exports.all_users = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}).sort({ score: -1 });
    if(!allUsers) {
        return res.status(404).send('No users found')
    }
    res.status(200).json(allUsers);
})