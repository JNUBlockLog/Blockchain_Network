let moment = require('moment')
let cardName = "admin@hackerton-network"

let composer = require('composer-client');
let BusinessNetworkConnection = composer.BusinessNetworkConnection;

let connection = new BusinessNetworkConnection();
let definition = "";
let factory = "";

main()
connection.on('event',(event)=>{
    console.log(event)
    if(event.name == 'EmergencyCarRequestCanceled'){
       console.log("Event omitted!") 
    }
})
async function main(){
    definition = await connection.connect(cardName);
    factory = definition.getFactory();

    let transaction = factory.newTransaction('org.hackerton','cancelEmergencyCarRequest')
    let requester = factory.newRelationship('org.hackerton', 'Requester','1');
    transaction.requestEmergencyCarID="1"
    transaction.requester = requester;
    console.log("")
    await connection.submitTransaction(transaction);
}