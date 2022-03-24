const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const App = Schema({


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
// const Database = Schema({
//     'Name': String,
//     'Type': String,
//     'Version': String,
//     'License': String,
// })

const Hardware = Schema({
    'MakeModel': String,
    'ServiceTagSerialNo': String,
    'CPU': String,
    'RAM': String,
    'HDD': String,
    'Graphic': String,
    'DVDDrive': String,
    'PowerSupply': String,
    'PowerSettoNever': Boolean,
    'Apps': [{ type: Schema.Types.ObjectId, ref: 'AppModel' }],
    'UpdateInstalled': [{
        "Status": Boolean,
        "DateOfInstalled": Date,
        "Type": String
    }],
    'Credentials': [{
        "AppsName": { type: Schema.Types.ObjectId, ref: 'AppModel' },
        "UserName": String,
        "Password": String,
    }]
})
const Site = Schema({
    'Name': String,
    'Address': String,
    'ContactNumber': Number,
    'Note': String,
    'Hardware': [{ type: Schema.Types.ObjectId, ref: 'HardwareModel' }],
})


const AppModel = mongoose.model('AppModel', App)
const HardwareModel = mongoose.model('HardwareModel', Hardware)
const SiteModel = mongoose.model('SiteModel', Site)
const UserModel = mongoose.model('UserModel', User)
// const DatabaseModel = mongoose.model('DatabaseModel', Database)
module.exports = {
    // DatabaseModel: DatabaseModel,
    AppModel: AppModel,
    HardwareModel: HardwareModel,
    SiteModel: SiteModel,
    UserModel: UserModel,
}