let moment = require('moment')
let process = require('process')
let cardName = "admin@factory-network"

let composer = require('composer-client');
let BusinessNetworkConnection = composer.BusinessNetworkConnection;

let connection = new BusinessNetworkConnection();
let definition = "";
let factory = "";
main();

async function main() {
    definition = await connection.connect(cardName);
    factory = definition.getFactory();
//    await getAllIDs("Asset","org.factory.Device","장비 : ");
    let result = await query("findDepertmentByName",{departmentName:"물류"});
    console.log(result)
    process.exit(0);
}

/* Queries */
async function query(queryName, parameters){
    return await connection.query(queryName, parameters);
}

/* Supports */
async function getAllIDs(type, FDQN, comment){
    let list = []
    if(type=='Asset') {
        list = await getAllAsset(FDQN)}
    else if(type=='Participant') {
        list = await getAllParticipant(FDQN)}
    else console.log("Error Occured!")
    for(var i=0; i<list.length;i++){
        console.log(`${comment}- ${list[i].DeviceID} - CurrentMAC : ${list[i].CurrentMAC}`)
    }
}
async function getAllParticipant(FDQN) {
    let registry = await connection.getParticipantRegistry(FDQN);
    let list = await registry.getAll();

    return list;
}
async function getAllAsset(FDQN) {
    let registry = await connection.getAssetRegistry(FDQN);
    let list = await registry.getAll();

    return list;
}