const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model')



router.get('/verify', (req, res) => {
    const findUser = req.headers['authorization'];
    jwt.verify(findUser, process.env.SECRET_TOKEN_JWT, async (err, user) => {
        if (err) {
            res.status(401).json(err)
        }
        else {
            res.send(user)
        }

    })
})
router.post('/register', async (req, res) => {
    const userExist = await UserModel.findOne({ 'ID': req.body.ID })
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Password, salt);
        var user = new UserModel({
            Name: req.body.Name,
            ID: req.body.ID,
            Password: hash,
            Rights: req.body.Rights
        })
        if (!userExist) {
            const savedUser = await user.save();
            res.send('User Registered')
        } else {
            res.send('User Already Exist')
        }
    } catch (error) {
        console.log(error)
    }

})

router.post('/signIn', async (req, res) => {

    const userfetch = await UserModel.findOne({ 'ID': req.body.ID })

    if (!userfetch) {
        res.send("Uknown UserName & Password")
        res.end()
    }
    const isMatch = await bcrypt.compare(req.body.Password, userfetch.Password)
    if (isMatch) {
        const user = {
            id: userfetch._id,
            Name: userfetch.Name,
            ID: userfetch.ID,
            Rights: userfetch.Rights,
        }
        const accessToken = jwt.sign(user, process.env.SECRET_TOKEN_JWT, { expiresIn: "20M" });
        res.json({ accessToken: accessToken })
    } else {
        res.send("Invalid Credential!")
    }
}
)
module.exports = router