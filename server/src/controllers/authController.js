
const UserModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const getJsonWebToken = (email, id) => {
    console.log('====================================');

    const payload = {
        email,
        id
    }

    console.log("JWT_SECRET:", process.env.SECRET_KEY);
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    return token
}

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

    res.status(200).json({
        message: 'User created',
        data: {
            email: newUser.email,
            username: newUser.username,
            accessstoken: await getJsonWebToken(email, newUser.id)
        }
    })

})

module.exports = {
    register
}