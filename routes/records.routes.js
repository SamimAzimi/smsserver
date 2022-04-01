const express = require('express')
const mongoose = require('mongoose')
const { SiteModel, HardwareModel } = require('../models/Entity.model')
const RecordModel = require('../models/Records.model')
const router = express.Router();


router.get('/allrecords', (req, res) => {
    var findRecord = SiteModel.find().populate('hardware').limit(100).then(result => {
        res.send(result)
    }).catch(err => {
        res.json({ er: err._message }).send();
    })
})

router.post('/siteName', (req, res) => {

    var findRecord = SiteModel.findOne({ 'siteName': req.body.siteName }).populate('hardware').then(result => {
        if (result === null) {
            res.json({ notfound: "The Record Doesnt Exists" }).send();
        }
        else {
            res.json({ found: result }).send()
        }

    }).catch(err => {
        res.json({ foundError: err._message }).send();
    })
})


router.post('/site', (req, res) => {
    var site = new SiteModel(req.body)
    site.save().then((result, err) => {
        console.log('err', err)
        console.log(result)
        res.send(result._id)
    }).catch(err => {
        console.log(err)
    })
})
router.post('/hardwaretoapp', (req, res) => {
    const id = req.body.recordID
    var hw = new HardwareModel(req.body.data)
    hw.save().then((result, err) => {
        console.log('err', err)
        if (result) {
            SiteModel.findById({ _id: req.body.recordID }).then(resultsite => {
                resultsite.hardware.push(result._id)
                resultsite.save(function (err) {
                    if (err) return console.log('error')
                    res.send(`success Inserted Hardware to ${resultsite.siteName}`)
                })
            }).catch(err => {
                console.log(err)
                res.send(err._message)
            })
        }
    }).catch(err => {
        console.log(err)
    })
})

router.post('/addtohardware', (req, res) => {
    if (req.body.subDocument === "App") {
        HardwareModel.findById({ _id: req.body.recordID }).then(result => {
            result.OS.push(req.body.newSub)
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



router.post('/record', async (req, res) => {
    const RecordExist = await RecordModel.findOne({ siteName: req.body.siteName })
    if (!RecordExist) {
        var record = new RecordModel(req.body)
        record.save().then(() => res.send('Record Saved Successfully')).catch(err => {
            res.send(err._message)
            console.log(err)

        })

    } else {
        res.send(`a Site by the Name ${req.body.siteName} Already Exist`)
    }

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

