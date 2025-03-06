
const UserModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')
require('dotenv').config()
console.log('EMAIL_USER:', process.env.EMAIL_USER)

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})
const getJsonWebToken = (email, id) => {

    const payload = {
        email,
        id
    }

    console.log("JWT_SECRET:", process.env.SECRET_KEY);
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    return token
}
const handleSendMail = async (val, email) => {

    try {
        await transporter.sendMail({
            from: 'trungkha',
            to: email,
            subject: "Verify email",
            text: "Your code to verification email",
            html: `<h1>${val}</h1>`,
        })
    } catch (error) {
        console.log('error:', error)

    }

}

const verifycation = asyncHandler(async (req, res) => {

    const { email, code } = req.body
    const verifycationCode = Math.round(1000 + Math.random() * 9000)

    try {
        await handleSendMail(verifycationCode, email)
        res.status(200).json({
            message: 'Send email success',
            data: {
                code: verifycationCode
            }
        })

    } catch (error) {
        res.send(401).json({
            message: 'Send email fail'
        })

    }
})

const register = asyncHandler(async (req, res) => {

    const { email, password, username } = req.body
    console.log('email:', email)

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

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await UserModel.findOne({ email })
    if (!existingUser) {
        res.status(403).json({
            message: 'user not found'
        })
        throw new Error('User not found')
    }
    const isMatchPassword = await bcrypt.compare(password, existingUser.password)
    console.log('isMatchPassword:', isMatchPassword)
    if (!isMatchPassword) {
        res.status(401).json({
            message: 'Invalid password'
        })
        throw new Error('Email or password is incorrect')
    }
    res.status(200).json({
        message: 'Login success',
        data: {
            email: existingUser.email,
            username: existingUser.username,
            accessstoken: await getJsonWebToken(email, existingUser.id)
        }
    })
})

module.exports = {
    register,
    login,
    verifycation

}