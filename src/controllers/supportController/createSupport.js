const express = require('express');
const User = require('../../models/User');
const Support = require('../../models/SupportSchema');

exports.createSupport = async (req, res) => {
    try{
        const user = req.user;
        const datee = Date.now();
        const {email, title, desc} = req.body;

        const support = await Support.create({
            User: user._id,
            email: email,
            title: title,
            description: desc,
            date: datee
        })
        if(!support){
            console.log("Could not send your message");
            return res.status(400).json("Could not send your message...Try again");
        }

        return res.status(200).json("Message sent successfully");
    }
    catch(error){
        return res.status(500).json({ status: "failed", message: error.message});
    }
}