

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