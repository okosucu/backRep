/*
*  IMPORTS
*/
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
/*
*
* HERE THE DEFINITION OF PERMISSION SCHEMA AS MONGOOSE SCHEMA.
* MOST OF FIELDS DEFINED AS STRING BECAUSE OF ENCRYPTION LIB SUGGESTS STRING
* FORMAT STRONGLY.
*
*
* */
const permissionSchema = new mongoose.Schema({

    permissionID:Number,
    isPermissionActive:Boolean,
    userID:Number,

    chiefID:Number,
    proxyChiefID:Number,

    generalManagerID:Number,
    proxyGeneralManagerID:Number,

    userStatus:Number,

    personalName:String,
    demandDateOfPermission:Date,
    beginDateOfPermission:Date,
    endDateOfPermission:Date,

    foldCode:Number,
    areaCode:Number,

    permissionDescription:String,

    selectVehicleUsageName:String,
    selectVehicleUsageID:String,

    personalCarUsage:Boolean,
    priceOfTrainOrBus:Number,
    totalDistanceOfIndividualCar:Number,

    setPermissionType:String,

    chiefConfirmStatus:Number,
    chiefsDescription:String,

    generalManagerConfirmStatus:Number,
    generalManagerDescription:String
});
/*
 * HERE A PLUGIN TO AUTO-INCREMENT OF PERMISSION OF AT THE DB.
 */
permissionSchema.plugin(AutoIncrement, {id:'counterOfPermissionID',inc_field: 'permissionID'});

/*
*  HERE A PLUGIN TO DETERMINE WHICH FIELDS ARE ENCRYPTED.WITH SALT GENERATOR AND SECRET KEY WORD.
 */
permissionSchema.plugin(mongooseFieldEncryption, {
    fields: ["permissionID"],
    secret: "some secret key",
    saltGenerator: function(secret) {
        return "1234567890123456"; // should ideally use the secret to return a string of length 16
    }
});
/*
 * HERE THE PERMISSION MODEL EXPORTED.
 */
const permissionModel = Model= module.exports = mongoose.model('permissionSchema', permissionSchema);
/*
*THIS METHOD RESETS PERMISSION ID TO 0.
 */
module.exports.resetIdCounter=function(){
    permissionModel.counterReset('counterOfPermissionID', function(err) {
        // Now the counter is 0
    });
}
/*
*   THIS METHOD DISPLAYS PERMISSIONS THAT BELONGS TO USER WHICH GIVEN AS "rawUserID" PARAMETER.
 */
module.exports.getPermissionsByUserID =  async function (userIDS, callback)  {
    const messageToSearchWith = new permissionModel({userID:userIDS});
    const query = {userID: messageToSearchWith.userID};
    await permissionModel.find(query,callback);
}

module.exports.getPermissionsByUserIDandData =  async function (userData, callback)  {

    const messageToSearchWith = new permissionModel({userID:userData.userID,isPermissionActive: userData.isPermissionActive});
    const query = {userID: messageToSearchWith.userID , isPermissionActive :messageToSearchWith.isPermissionActive};

    await permissionModel.find(query,callback);
}

module.exports.getPermissionsByChiefIDandData =  async function (userData, callback)  {

    const messageToSearchWith = new permissionModel({chiefID:userData.chiefID,isPermissionActive: userData.isPermissionActive});
    const query = {chiefID: messageToSearchWith.chiefID , isPermissionActive :messageToSearchWith.isPermissionActive};

    await permissionModel.find(query,callback);
}

module.exports.getPermissionsByProxyChiefIDandData =  async function (userData, callback)  {

    const messageToSearchWith = new permissionModel({proxyChiefID:userData.proxyChiefID,isPermissionActive: userData.isPermissionActive});
    const query = {proxyChiefID: messageToSearchWith.proxyChiefID , isPermissionActive :messageToSearchWith.isPermissionActive};

    await permissionModel.find(query,callback);
}

module.exports.getPermissionsByGeneralManagerIDandData =  async function (userData, callback)  {

    const messageToSearchWith = new permissionModel({generalManagerID:userData.generalManagerID,isPermissionActive: userData.isPermissionActive});
    const query = {generalManagerID: messageToSearchWith.generalManagerID , isPermissionActive :messageToSearchWith.isPermissionActive};

    await permissionModel.find(query,callback);
}

/*
module.exports.getPermissionsByUserIDandRawData =  async function (userData, callback)  {

    const messageToSearchWith = new permissionModel({chiefID:userData.chiefID,isPermissionActive: userData.isPermissionActive});
    const query = {chiefID: messageToSearchWith.chiefID , isPermissionActive :messageToSearchWith.isPermissionActive};

    await permissionModel.find(query,callback);
}
*/


/*module.exports.getPermissionsByChiefID =  async function (chiefID, callback)  {
    const messageToSearchWith = new permissionModel({userID:chiefID});
    const query = {userID: messageToSearchWith.userID};
    console.log(query,"aranannnnnn")
    await permissionModel.find(query,callback);
}*/
/*

module.exports.getPermissionsByUserIDAndData =  async function (userData, callback)  {
    const messageToSearchWith = new permissionModel({userID:userData.userID});
    messageToSearchWith.encryptFieldsSync();
    const query = {userID: messageToSearchWith.userID, isPermissionActive:userData.isPermissionActive};
    await permissionModel.find(query,callback);
}
*/

/*
module.exports.getPermissionByPermissionID =  async function (rawPermissionID, callback)  {
    const messageToSearchWith = new permissionModel({permissionID:rawPermissionID});
    const query = {permissionID: messageToSearchWith.permissionID};
    await permissionModel.find (query,callback);
}
*/
