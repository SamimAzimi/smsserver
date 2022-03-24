const express = require('express')
const mongoose = require('mongoose')
const RecordModel = require('../models/Records.model')
const router = express.Router();

router.post('/record', (req, res) => {
    var record = new RecordModel(req.body)
    record.save().then(() => res.send('Record Saved Successfully')).catch(err => {
        res.send(err._message)
    })
})

router.get('/allrecords', (req, res) => {
    var findRecord = RecordModel.find().limit(10).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err._message)
    })
})

module.exports = router