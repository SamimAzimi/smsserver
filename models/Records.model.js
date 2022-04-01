const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Record = Schema({
    'siteName': String,
    'siteAddress': String,
    'siteContactNumber': Number,
    'siteNote': String,
    'hardware': [{
        'location': String,
        'type': String,
        'MakeModel': String,
        'ServiceTagSerialNo': String,
        'CPU': String,
        'RAM': Number,
        'HDD': Number,
        'Graphic': String,
        'DVDDrive': String,
        'PowerSupply': String,
        'PowerSettoNever': Boolean,
        "sourceFile": String,
        "RaidLevel": String,
        "OS": {
            "OSname": String,
            "OSVersion": String,
            "UserName": String,
            "password": String,
            "UpdateInstalled": String,
            "UpdateTurnedOff": Boolean,
        },
        'apps': {
            'appsName': String,
            'appsVersion': String,
            "appsUserName": String,
            "appsPassword": String

        },
        "DB": {
            "DBinstalled": Boolean,
            "DBname": String,
            "DBVersion": String,
            "DBsaPassword": String,
        },
        'network': {
            "IP": String,
            "subnetMask": String,
            "gateway": String,

        }
    }],
})

module.exports = mongoose.model('RecordModel', Record)