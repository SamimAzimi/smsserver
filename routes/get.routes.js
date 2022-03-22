const express = require('express')
const mongoose = require('mongoose')
const { AppModel } = require('../models/Entity.model')
const { UserModel } = require('../models/Entity.model')
const { HardwareModel } = require('../models/Entity.model')
const { SiteModel } = require('../models/Entity.model')
const router = express.Router();


router.get('/allApps', async (req, res) => {
    var findApp = await AppModel.find()
    res.send(findApp)
})
router.get('/allUsers', async (req, res) => {

    var findUser = await UserModel.find()
    res.send(findUser)
})
router.get('/allSites', (req, res) => {

    SiteModel.find().populate('Hardware').populate('Hardware.Apps').exec(function (err, results) {

        res.send(results)
        console.log(results)
    });
})
router.get('/allHardwares', async (req, res) => {

    HardwareModel.find().populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

        res.send(results)
    });
})

module.exports = router