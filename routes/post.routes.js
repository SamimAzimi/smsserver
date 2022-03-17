const express = require('express')
const mongoose = require('mongoose')
// const { DatabaseModel } = require('../models/Entity.model')
const { AppModel } = require('../models/Entity.model')
const { UserModel } = require('../models/Entity.model')
const { HardwareModel } = require('../models/Entity.model')
const { SiteModel } = require('../models/Entity.model')
const router = express.Router();


router.post('/addApps', async (req, res) => {
    var findApp = await AppModel.findOne({ Version: req.body.Version }, 'Version')
    if (!findApp) {
        var app = new AppModel({

            'Name': req.body.Name,
            'Type': req.body.Type,
            'Version': req.body.Version,
            'License': req.body.License
        })
        app.save().then(() => res.send("Apps Saved Successfully")).catch(err => console.log(err._message))
    } else {
        res.send("This Version of App Already Exist")
    }

})

router.post('/addUser', async (req, res) => {
    var findUser = await UserModel.findOne({ Name: req.body.Name }, 'Name')
    if (!findUser) {
        var user = new UserModel({

            'Name': req.body.Name,
            'Password': req.body.Password,
            'Rights': req.body.Rights
        })
        user.save().then(() => res.send("User Saved Successfully")).catch(err => console.log(err._message))
    } else {
        res.send(`${findUser.Name} User Already Exist`)
    }

})


router.post('/addHardware', async (req, res) => {

    // apps reference array making
    const appreferenceraw = Object.values(req.body.Apps)
    let appreerenceArray = []
    for (var i = 0; i < appreferenceraw.length; i++) {
        appreerenceArray.push(mongoose.Types.ObjectId(appreferenceraw[i]));
    }
    var findHardware = await HardwareModel.findOne({ 'ServiceTagSerialNo': req.body.ServiceTagSerialNo }, 'ServiceTagSerialNo')
    if (!findHardware) {
        var hardware = new HardwareModel({

            'MakeModel': req.body.MakeModel,
            'ServiceTagSerialNo': req.body.ServiceTagSerialNo,
            'CPU': req.body.CPU,
            'RAM': req.body.RAM,
            'HDD': req.body.HDD,
            'Graphic': req.body.Graphic,
            'DVDDrive': req.body.DVDDrive,
            'PowerSupply': req.body.PowerSupply,
            'PowerSettoNever': req.body.PowerSettoNever,
            'Apps': appreerenceArray,
            'UpdateInstalled': [req.body.UpdateInstalled],
            'Credentials': req.body.Credentials
        })
        hardware.save().then(() => res.send("Hardware Saved Successfully")).catch(err => console.log(err._message))
    } else {
        res.send(`${findHardware.ServiceTagSerialNo} Serial Already Exist`)
    }
})
router.post('/addSite', async (req, res) => {
    const hardwarereferenceraw = Object.values(req.body.Hardware)
    let hardwarereerenceArray = []
    for (var i = 0; i < hardwarereferenceraw.length; i++) {
        hardwarereerenceArray.push(mongoose.Types.ObjectId(hardwarereferenceraw[i]));
    }
    var findSite = await SiteModel.findOne({ Name: req.body.Name.toUpperCase() }, 'Name')
    if (!findSite) {
        var site = new SiteModel({

            'Name': req.body.Name.toUpperCase(),
            'Addresss': req.body.Address,
            'ContactNumber': req.body.ContactNumber,
            'Note': req.body.Note,
            'Hardware': hardwarereerenceArray,
        })
        site.save().then(() => res.send("User Saved Successfully")).catch(err => console.log(err._message))
    } else {
        res.send(`${findSite.Name} User Already Exist`)
    }
})
module.exports = router