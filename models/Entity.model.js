const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Site = Schema({
    'siteName': String,
    'siteAddress': String,
    'siteContactNumber': Number,
    'hardware': [{ type: Schema.Types.ObjectId, ref: 'HardwareModel' }],
    'extraHardware': String,
})
const Hardware = Schema({
    'location': String,
    'Notes': String,
    'type': String,
    'MakeModel': String,
    'function': String,
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
    "additionalSoftware": String,
    "OS": [{
        "OSname": String,
        "OSVersion": String,
        "UserName": String,
        "password": String,
        "UpdateInstalled": String,
        "UpdateTurnedOff": Boolean,
    }],
    'apps': [
        {
            'appsName': String,
            'appsVersion': String,
            "appsUserName": String,
            "appsPassword": String

        }
    ],
    "DB": [
        {
            "DBinstalled": Boolean,
            "DBname": String,
            "DBVersion": String,
            "DBsaPassword": String,
        }
    ],
    'network': [{
        "IP": String,
        "subnetMask": String,
        "gateway": String,
    }]
    // 'OS': { type: Schema.Types.ObjectId, ref: 'OSModel' },
    // 'apps': { type: Schema.Types.ObjectId, ref: 'AppsModel' },
    // 'DB': { type: Schema.Types.ObjectId, ref: 'DBModel' },
    // 'network': { type: Schema.Types.ObjectId, ref: 'NetModel' },

})
const OS = Schema({
    "OSname": String,
    "OSVersion": String,
    "UserName": String,
    "password": String,
    "UpdateInstalled": String,
    "UpdateTurnedOff": Boolean,
})

const App = Schema({
    'appsName': String,
    'appsVersion': String,
    "appsUserName": String,
    "appsPassword": String

})
const DB = Schema({
    "DBinstalled": Boolean,
    "DBname": String,
    "DBVersion": String,
    "DBsaPassword": String,
})
const NetWork = Schema({
    "IP": String,
    "subnetMask": String,
    "gateway": String,
})
const User = Schema({
    'Name': String,
    'ID': String,
    'Password': String,
    'Rights': {
        "Read": Boolean,
        "Write": Boolean,
        "Execute": Boolean,
    },
})






const SiteModel = mongoose.model('SiteModel', Site)
const HardwareModel = mongoose.model('HardwareModel', Hardware)
const OSModel = mongoose.model('OSModel', OS)
const AppsModel = mongoose.model('AppsModel', App)
const DBModel = mongoose.model('DBModel', DB)
const NetModel = mongoose.model('NetModel', NetWork)
const UsersModel = mongoose.model('UserModels', User)
module.exports = {
    SiteModel: SiteModel,
    HardwareModel: HardwareModel,
    OSModel: OSModel,
    AppsModel: AppsModel,
    NetModel: NetModel,
    DBModel: DBModel,
    UsersModel: UsersModel,
}