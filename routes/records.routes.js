const express = require('express')
const mongoose = require('mongoose')
const { SiteModel, HardwareModel } = require('../models/Entity.model')
const RecordModel = require('../models/Records.model')
const router = express.Router();
const fs = require('fs')
var pdf = require("html-pdf");
const ip = require("ip")
const qrcode = require('qrcode')
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
    var hw = new HardwareModel(req.body.data)
    // hw.apps.push(req.body.data.apps)
    // hw.network.push(req.body.data.network)
    // hw.OS.push(req.body.data.OS)
    // hw.DB.push(req.body.data.DB)
    console.log(hw)
    hw.save().then((result, err) => {
        if (err) console.log('err', err)
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

router.get('/pdf/:siteName', (req, res) => {
    var html = fs.readFileSync("views/index.ejs", "utf8");
    const options = {
        format: "A4",
        orientation: "landscape",
        border: "5mm",
    };
    var time = new Date();
    var date = time.getDate() + '/' + time.getDay() + '/' + time.getFullYear();
    var findRecord = SiteModel.findOne({ 'siteName': req.params.siteName }).populate('hardware').then(result => {
        if (result === null) {
            res.json({ notfound: "The Record Doesnt Exists" }).send();
        }
        if (result !== null) {

            const imageurl = `https://servicemanagementsystem.herokuapp.com/api/pdf/${result.siteName}`
            qrcode.toDataURL(imageurl, function (err, url) {
                res.render('index', { data: result, time: date, qrcodeImage: url }, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        pdf.create(data, options).toFile(`./pdfs/${result.siteName}_${Date.now()}.pdf`, function (err, data) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.sendFile(data.filename);
                            }
                        });
                    }
                })
            })

        }

    }).catch(err => {
        res.json({ foundError: err._message }).send();
    })

})

module.exports = router

