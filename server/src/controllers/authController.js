
const UserModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')
require('dotenv').config()

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

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const randomPassword = Math.round(100000 + Math.random() * 99000)

    const user = await UserModel.findOne({ email })
    console.log('user:', user)
    if (user) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(randomPassword.toString(), salt)
        await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword })
        try {
            await transporter.sendMail({
                from: 'trungkha',
                to: email,
                subject: "Verify password",
                text: "Your code to verification password",
                html: `<h1>${randomPassword}</h1>`,
            })
            res.status(200).json({
                message: 'Send new password success',
                data: []
            })
        } catch (error) {
            console.log('error:', error)

        }
    } else {
        res.status(401).json({
            message: 'User not found'
        })
        throw new Error('User not found')
    }


})

const verifyPassword = asyncHandler(async (req, res) => {
    const userInfo = await UserModel.findById(req.user.id)
    if (!userInfo) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatchPass = await bcrypt.compare(req.body.password, userInfo.password)

    if (!isMatchPass) {
        res.status(401).json({
            message: 'incorrect'
        })
        throw new Error('Password is incorrect')
    } else {
        res.status(200).json({
            message: 'correct',
            data: []
        })
    }

})


module.exports = {
    register,
    login,
    verifycation,
    forgotPassword,
    verifyPassword

}