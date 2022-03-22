const express = require('express')
const mongoose = require('mongoose')
// const { DatabaseModel } = require('../models/Entity.model')

const { UserModel, HardwareModel, AppModel, SiteModel } = require('../models/Entity.model')
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
        site.save().then(() => res.send("User Saved Successfully")).catch(err => console.log(err))
    } else {
        res.send(`${findSite.Name} User Already Exist`)
    }
})

router.post('/field', async (req, res) => {
    const field = req.body
    const name = field.name

    //    "Name": {$regex:  `/${field.value}$/`, $options:"i"
    if (field.model == "Apps") {
        if (name === "Name") {
            var findApp = await AppModel.find({ "Name": req.body.value })
            res.send(findApp)
        }
        else if (name === "Type") {
            var findApp = await AppModel.find({ "Type": req.body.value })
            res.send(findApp)
        }
        else if (name === "Version") {
            var findApp = await AppModel.find({ "Version": req.body.value })
            res.send(findApp)
        }
        else if (name === "License") {
            var findApp = await AppModel.find({ "License": req.body.value })
            res.send(findApp)
        }




    } else if (req.body.model === "Hardware") {

        if (name === "MakeModel") {
            await HardwareModel.find({ "MakeModel": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "SerialNo") {
            await HardwareModel.find({ "ServiceTagSerialNo": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "CPU") {
            await HardwareModel.find({ "CPU": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "RAM") {
            await HardwareModel.find({ "RAM": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "Graphic") {
            await HardwareModel.find({ "Graphic": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "DVDDrive") {
            await HardwareModel.find({ "DVDDrive": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "PowerSupply") {
            await HardwareModel.find({ "PowerSupply": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "PowerSettoNever") {
            await HardwareModel.find({ "PowerSettoNever": req.body.value }).populate('Apps').populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }
        else if (name === "Apps") {
            await HardwareModel.find().populate({
                path: 'Apps',
                match: { Version: req.body.value },
            }).populate('Credentials.AppsName').exec(function (err, results) {

                res.send(results)

            });
        }


    } else if (field.model == "User") {
        if (name == "Name") {
            var findUser = await UserModel.find({ "Name": req.body.value })
            res.send(findUser)
        } else if (name === "ID") {
            var findUser = await UserModel.find({ "ID": req.body.value })
            res.send(findUser)
        }
        else if (name === "Read") {
            var findUser = await UserModel.find({ 'Rights.Read': req.body.value })
            res.send(findUser)
        } else if (name === "Write") {
            var findUser = await UserModel.find({ 'Rights.Write': req.body.value })
            res.send(findUser)
        } else if (name === "Execute") {
            var findUser = await UserModel.find({ 'Rights.Execute': req.body.value })
            res.send(findUser)
        }




    } else if (field.model == "Sites") {

        if (name === "Name") {
            SiteModel.find({ "Name": req.body.value }).populate('Hardware').populate('Hardware.Apps').exec(function (err, results) {

                res.send(results)
                console.log(results)
            });
        }
        else if (name === "Address") {
            SiteModel.find({ "Address": req.body.value }).populate('Hardware').populate('Hardware.Apps').exec(function (err, results) {

                res.send(results)
                console.log(results)
            });
        }
        else if (name === "ContactNumber") {
            SiteModel.find({ "ContactNumber": req.body.value }).populate('Hardware').populate('Hardware.Apps').exec(function (err, results) {

                res.send(results)
                console.log(results)
            });
        }
        else if (name === "Note") {
            SiteModel.find({ "Note": req.body.value }).populate('Hardware').populate('Hardware.Apps').exec(function (err, results) {

                res.send(results)
                console.log(results)
            });
        }
        else if (name === "Hardware") {
            SiteModel.find().populate('Hardware').populate({
                path: 'Hardware.Apps',
                match: { Version: req.body.value }
            }).exec(function (err, results) {

                res.send(results)
                console.log(results)
            });
        }
    } else {
        res.send("nothing to search")
    }
})



module.exports = router