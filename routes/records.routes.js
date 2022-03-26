const express = require('express')
const mongoose = require('mongoose')
const RecordModel = require('../models/Records.model')
const router = express.Router();


router.post('/addToSite', (req, res) => {
    if (req.body.subDocument === "App") {
        RecordModel.findById({ _id: req.body.recordID }).then(result => {
            result.apps.push(req.body.newSub)
            result.save(function (err) {
                if (err) return console.log('error')
                res.send(`success Inserted New Apps to ${result.siteName}`)
            })
        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.subDocument === "Database") {
        RecordModel.findById({ _id: req.body.recordID }).then(result => {
            result.DB.push(req.body.newSub)
            result.save(function (err) {
                if (err) return console.log('error')
                res.send(`success Inserted New Apps to ${result.siteName}`)
            })
        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.subDocument === "Hardware") {
        RecordModel.findById({ _id: req.body.recordID }).then(result => {
            result.hardware.push(req.body.newSub)
            result.save(function (err) {
                if (err) return console.log('error')
                res.send(`success Inserted New Apps to ${result.siteName}`)
            })
        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
})



router.post('/record', (req, res) => {
    const RecordExist = RecordModel.findOne({ siteName: req.body.siteName })
    if (!RecordExist) {
        var record = new RecordModel(req.body)
        record.save().then(() => res.send('Record Saved Successfully')).catch(err => {
            res.send(err._message)

        })

    } else {
        res.send(`a Site by the Name ${req.body.siteName} Already Exist`)
    }

})

router.get('/allrecords', (req, res) => {
    var findRecord = RecordModel.find().limit(100).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
})

router.post('/recordName', (req, res) => {

    var findRecord = RecordModel.find({ 'siteName': req.body.siteName }).limit(100).then(result => {
        if (result.length === 0) {

            res.json({ notfound: "The Record Doesnt Exists" }).send();
        }
        else {
            res.send(result)
        }

    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
})

router.post('/options', (req, res) => {


    if (req.body.options == 2) {
        var findRecord = RecordModel.find({ 'siteContactNumber': req.body.query }).limit(100).then(result => {
            if (result.length === 0) {

                res.json({ notfound: "The Record Doesnt Exists" }).send();
            }
            else {
                res.send(result)
            }
        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.options == 3) {
        var findRecord = RecordModel.find({ 'hardware.MakeModel': req.body.query }).limit(100).then(result => {
            if (result.length === 0) {

                res.json({ notfound: "The Record Doesnt Exists" }).send();
            }
            else {
                res.send(result)
            }

        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.options == 4) {
        var findRecord = RecordModel.find({ 'hardware.ServiceTagSerialNo': req.body.query }).limit(100).then(result => {
            if (result.length === 0) {

                res.json({ notfound: "The Record Doesnt Exists" }).send();
            }
            else {
                res.send(result)
            }

        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.options == 5) {
        var findRecord = RecordModel.find({ 'apps.appsName': req.body.query }).limit(100).then(result => {
            if (result.length === 0) {

                res.json({ notfound: "The Record Doesnt Exists" }).send();
            }
            else {
                res.send(result)
            }

        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }
    if (req.body.options == 6) {
        var findRecord = RecordModel.find({ 'apps.appsVersion': req.body.query }).limit(100).then(result => {
            if (result.length === 0) {

                res.json({ notfound: "The Record Doesnt Exists" }).send();
            }
            else {
                res.send(result)
            }

        }).catch(err => {
            console.log(err)
            res.send(err._message)
        })
    }


})

module.exports = router

