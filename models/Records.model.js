const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Record = Schema({
    'siteName': String,
    'siteAddress': String,
    'siteContactNumber': Number,
    'siteNote': String,
    'network': [{
        "IP": String,
        "subnetMask": String,
        "gateway": String,
        "sourceFile": String,

    }],
    'hardware': [{
        'MakeModel': String,
        'ServiceTagSerialNo': String,
        'CPU': String,
        'CPUQt': Number,
        'RAM': Number,
        'HDD': Number,
        'Graphic': String,
        'DVDDrive': String,
        'PowerSupply': String,
        'PowerSettoNever': Boolean,
    }],
    'apps': [{
        'appsName': String,
        'appsVersion': String,
        "appsUserName": String,
        "appsPassword": String

    }],
    "DB": {
        "DBinstalled": Boolean,
        "DBname": String,
        "DBVersion": String,
        "DBsaPassword": String,
    },
    "OS": {
        "OSname": String,
        "OSVersion": String,
        "UpdateInstalled": String,
        "UpdateTurnedOff": Boolean,
    }
})

module.exports = mongoose.model('RecordModel', Record)