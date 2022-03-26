const express = require('express')
const mongoose = require('mongoose')
const RecordModel = require('../models/Records.model')
const router = express.Router();

router.post('/record', (req, res) => {
    console.log(req.body)
    var record = new RecordModel(req.body)
    record.save().then(() => res.send('Record Saved Successfully')).catch(err => {
        res.send(err._message)
    
    })
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
    console.log(req.body)
    var findRecord = RecordModel.find({ 'siteName': req.body.siteName }).limit(100).then(result => {
        if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
})

router.post('/options', (req, res) => {

    console.log(req.body)
    if(req.body.options ==2){
    var findRecord = RecordModel.find({ 'siteContactNumber': req.body.query }).limit(100).then(result => {
         if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
    }
      if(req.body.options ==3){
    var findRecord = RecordModel.find({ 'hardware.MakeModel': req.body.query }).limit(100).then(result => {
        if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
    }
       if(req.body.options ==4){
    var findRecord = RecordModel.find({ 'hardware.ServiceTagSerialNo': req.body.query }).limit(100).then(result => {
         if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
    }
    if(req.body.options ==5){
    var findRecord = RecordModel.find({ 'apps.appsName': req.body.query }).limit(100).then(result => {
        if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
    }
    if(req.body.options ==6){
    var findRecord = RecordModel.find({ 'apps.appsVersion': req.body.query }).limit(100).then(result => {
        if(result){
            res.send(result)

        }
        else{
            res.send({notfound:"The Record Doesnt Exists"})
        }
       
    }).catch(err => {
        console.log(err)
        res.send(err._message)
    })
    }
      

}) 

module.exports = router

