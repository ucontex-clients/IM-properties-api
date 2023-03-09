const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const express = require('express');

const updateUserPassword = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newPass, salt);
    const hashedOldPassword = await bcrypt.hash(req.body.newPass, salt);
    const data = {
        password: hashedNewPassword
    }
    try {
        const checkpassword = await User.findOne({ password: hashedOldPassword });

        if (!checkpassword) {
            return res.status(400).json("Invalid Password");
        }
        else {
            const changedPassword = await User.findOneAndReplace(hashedOldPassword, data, { new: true })

            if (changedPassword) {
                return res.status(200).json({ status: "success", message: changedPassword });
            } else return res.status(400).json("Cannot update your password..Try Again");
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 'failed', message: error.message });
    }
}

module.exports = updateUserPassword;