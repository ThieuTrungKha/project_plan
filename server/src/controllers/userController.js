const UserModel = require('../model/userModel');
const { getOneDataById, updateDataById } = require('../service/crudService');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')


const getUsser = async (req, res) => {
    getOneDataById(UserModel, req.user.id, 'User found', 'User not found', res)
}
const updateInfoUser = asyncHandler(
    async (req, res) => {
        updateDataById(req.user.id, req.body, UserModel, 'User updated successfully', 'Error updating user', res)
    }
)
const updatePassUser = asyncHandler(async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true, runValidators: true } // Ensure new data is returned & validation is enforced
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = { getUsser, updateInfoUser, updatePassUser } 