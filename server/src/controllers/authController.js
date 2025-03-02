const UserModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        res.status(401)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        email,
        password: hashedPassword,
        username
    })
    await newUser.save()
    res.status(201).json({
        message: 'User created',
        data: {
            ...newUser,
            accessstoken: 'aaa'
        }
    })

})

module.exports = {
    register
}