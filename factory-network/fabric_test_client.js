let moment = require('moment')
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
    // 모두 제거
    
    var before = moment().unix()
    console.log("데이터 제거 중..");
    try{
    await removeAllAsset('org.factory.WiFiAP');
    await removeAllAsset('org.factory.Device');
    await removeAllParticipant('org.factory.Department');
    await removeAllParticipant('org.factory.SecurityManager');
    await removeAllParticipant('org.factory.DeviceManager');
    await removeAllParticipant('org.factory.Worker');
    }catch(e){}
    var after = moment().unix()
    console.log(after - before)
    
    // 부서 추가
    var before = moment().unix()
    console.log("부서 추가 중..");
    let security_id = await addDepartment("보안");
    let logistics_id = await addDepartment("물류");
    let materials_id = await addDepartment("자재");
    let assembly_id = await addDepartment("조립");
    var after = moment().unix()
    console.log(after - before)
    await getAllIDs("Participant","org.factory.Department", "부서");
    // 보안 관리자 추가
    var before = moment().unix()
    console.log("보안 관리자 추가 중..");
    let sec_manA = await addSecurityManager('',security_id);
    let sec_manB = await addSecurityManager('',security_id);
    var after = moment().unix()
    await getAllIDs("Participant","org.factory.SecurityManager", "보안관리자");
    console.log(after - before)
    // 장비 담당자 추가
    var before = moment().unix()
    console.log("장비 담당자 추가 중..");
    let dev_manA = await addDeviceManager('',security_id);
    let dev_manB = await addDeviceManager('',logistics_id);
    var after = moment().unix()
    await getAllIDs("Participant","org.factory.DeviceManager", "장비관리자");
    console.log(after - before)
    // 일꾼 추가
    var before = moment().unix()
    console.log("일꾼 추가 중..");
    let workerA = await addWorker('',logistics_id);
    let workerB = await addWorker('',logistics_id);
    let workerC = await addWorker('',materials_id);
    let workerD = await addWorker('',materials_id);
    let workerE = await addWorker('',materials_id);
    let workerF = await addWorker('',assembly_id);
    let workerG = await addWorker('',assembly_id);
    let workerH = await addWorker('',assembly_id);
    let workerI = await addWorker('',assembly_id);
    let workerJ = await addWorker('',assembly_id);
    let workerK = await addWorker('',assembly_id);
    let workerL = await addWorker('',assembly_id);
    let workerM = await addWorker('',security_id);
    var after = moment().unix()
    await getAllIDs("Participant","org.factory.Worker", "일꾼");
    console.log(after - before)
    
    // WiFi Device 추가
    var before = moment().unix()
    console.log("WiFi 추가 중");
    let WiFiA = {
        name : "물류부서",
        DeviceType : "AP",
        DeviceDesc : "물류부서 AP",
        CPUInfomation : "Router",
        MACAddress : "11:22:33:44:55:66",
        Processes : "1 Online"
    }
    await addDevice(WiFiA,workerA,dev_manA,logistics_id)
    let WiFiB = {
        name : "자재부서",
        DeviceType : "AP",
        DeviceDesc : "자재부서 AP",
        CPUInfomation : "Router",
        MACAddress : "22:33:44:55:66:77",
        Processes : "1 Online"
    }
    await addDevice(WiFiB,workerC,dev_manA,materials_id)
    let WiFiC = {
        name : "조립부서",
        DeviceType : "AP",
        DeviceDesc : "조립부서 AP",
        CPUInfomation : "Router",
        MACAddress : "33:44:55:66:77:88",
        Processes : "1 Online"
    }
    await addDevice(WiFiC,workerF,dev_manB,assembly_id)
    let WiFiD = {
        name : "보안부서",
        DeviceType : "AP",
        DeviceDesc : "보안부서 AP",
        CPUInfomation : "Router",
        MACAddress : "44:55:66:77:88:99",
        Processes : "1 Online"
    }
    await addDevice(WiFiD,workerM,dev_manA,security_id)
    var after = moment().unix()
    await getAllIDs("Asset","org.factory.Device", "WiFi");
    console.log(after - before)
    // 일반 Device 추가
}

async function request(requester, x, y) {
    let serializer = definition.getSerializer();

    let registry = connection.getAssetRegistry('org.hackerton.Patient');
    
    let currentTime = moment().unix();

    patient = factory.newResource('org.hackerton', 'Patient', currentTime)
    patient.requester = requester
    patient.x = x
    patient.y = y

    await this.registry.addAll([request]);

    let request = serializer.fromJSON({
        "$class": 'org.hackerton.requestEmergencyCar',
        'patient': patient,
        'requester': requester,
        'x': x,
        'y': y
    })

    await connection.submitTransaction(request)
}

async function addWiFiAP(name, departmentID){
    let registry = await connection.getAssetRegistry('org.factory.WiFiAP');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','WiFiAP', currentTime.toString());
    newResource.name = name;
    newResource.department = factory.newRelationship('org.factory', 'Department', departmentID);
    await registry.add(newResource);
    return currentTime.toString();
}
async function addDevice(deviceData, user, manager, department){
    let registry = await connection.getAssetRegistry('org.factory.Device');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','Device', currentTime.toString());
    newResource.name = deviceData.name;
    newResource.DeviceType = deviceData.DeviceType;
    newResource.DeviceDesc = deviceData.DeviceDesc;
    newResource.CPUInfomation = deviceData.CPUInfomation;
    newResource.MACAddress = deviceData.MACAddress;
    newResource.Processes = deviceData.Processes;
    newResource.DeviceUser = factory.newRelationship('org.factory','Worker',user);
    newResource.DeviceManager = factory.newRelationship('org.factory','DeviceManager',manager);
    newResource.currentDepartment = factory.newRelationship('org.factory','Department',department);
    await registry.add(newResource);
    return currentTime.toString();
}
async function addDepartment(name){
    let registry = await connection.getParticipantRegistry('org.factory.Department');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','Department', currentTime.toString());
    newResource.name = name;
    await registry.add(newResource);
    return currentTime.toString();
}
async function addSecurityManager(name, departmentID){
    let registry = await connection.getParticipantRegistry('org.factory.SecurityManager');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','SecurityManager', currentTime.toString());
    newResource.name = name;
    newResource.departmentID=factory.newRelationship('org.factory', 'Department',departmentID);
    await registry.add(newResource);
    return currentTime.toString();
}
async function addDeviceManager(name, departmentID){
    let registry = await connection.getParticipantRegistry('org.factory.DeviceManager');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','DeviceManager', currentTime.toString());
    newResource.name = name;
    newResource.departmentID=factory.newRelationship('org.factory', 'Department',departmentID);
    await registry.add(newResource);
    return currentTime.toString();
}
async function addWorker(name, departmentID){
    let registry = await connection.getParticipantRegistry('org.factory.Worker');
    let currentTime = moment().unix();
    let newResource = factory.newResource('org.factory','Worker', currentTime.toString());
    newResource.name = name;
    newResource.departmentID=factory.newRelationship('org.factory', 'Department',departmentID);
    await registry.add(newResource);
    return currentTime.toString();
}
/* Common Modules*/
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
async function removeAllAsset(FDQN) {
    let registry = await connection.getAssetRegistry(FDQN);
    let list = await registry.getAll();
    try{
    await registry.removeAll(list)
    } catch(e){}
}
async function removeAllParticipant(FDQN) {
    let registry = await connection.getParticipantRegistry(FDQN);
    let list = await registry.getAll();
    try{
    await registry.removeAll(list)
} catch(e){}
}
async function updateAsset(FDQN,data){
    let registry = await connection.getAssetRegistry(FDQN);
    await registry.update(data);
}
async function updateParticipant(FDQN,data){
    let registry = await connection.getParticipantRegistry(FDQN);
    await registry.update(data);
}

async function getAllIDs(type, FDQN, comment){
    let list = []
    if(type=='Asset') {
        list = await getAllAsset(FDQN)}
    else if(type=='Participant') {
        list = await getAllParticipant(FDQN)}
    else console.log("Error Occured!")
    for(var i=0; i<list.length;i++){
        console.log(`${comment} name : ${list[i].name}`)
    }
}

/* Queries */
async function query_FindEmergencyBed(queryName, parameters){
    return await connection.query(queryName, parameters);
}

/*

    // 요청자 추가
    console.log("요청자 추가 중...");
    var before = moment().unix()
    await addRequester(10, 5);
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 요청자 목록 읽기
    var before = moment().unix()
    let RequesterList = await getAll('org.hackerton.Requester');
    for (let i = 0; i < RequesterList.length; i++) {
        console.log(`요청자 : ${RequesterList[i].RequesterID}: ${RequesterList[i].x}, ${RequesterList[i].y}`);
    }
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 병원 추가
    var before = moment().unix()
    await addHospital("A병원", "1");
    await addHospital("B병원", "2");
    await addHospital("C병원", "3");
    await addHospital("D병원", "4");
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 병원 목록 읽기
    var before = moment().unix()
    let HospitalList = await getAll('org.hackerton.Hospital');
    console.log("병원============")
    for (let i = 0; i < HospitalList.length; i++) {
        console.log(`병원 : ${HospitalList[i].HospitalID}: ${HospitalList[i].name}`);
    }
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 관계 추가

    let HospitalA = factory.newRelationship('org.hackerton', 'Hospital', '1');
    let HospitalB = factory.newRelationship('org.hackerton', 'Hospital', '2');
    let HospitalC = factory.newRelationship('org.hackerton', 'Hospital', '3');
    let HospitalD = factory.newRelationship('org.hackerton', 'Hospital', '4');

    // 구급차 추가    
    await addCar(1, 10, HospitalA);

    // 구급차 읽기
    console.log("구급차");
    // 응급실 추가
    let bedA = await addBed(2, 15, HospitalA);
    let bedB = await addBed(10, 15, HospitalB);
    let bedC = await addBed(2, 2, HospitalC);
    let bedD = await addBed(10, 2, HospitalD);

    // 응급실 읽기
    let EmergencyBedList = await getAll('org.hackerton.EmergencyBed');
    console.log("응급실 좌석=========")
    for (let i = 0; i < EmergencyBedList.length; i++) {
        console.log(`좌석: ${EmergencyBedList[i].BedID}: ${EmergencyBedList[i].x}, ${EmergencyBedList[i].y}, ${EmergencyBedList[i].owner}`);
    }
    // 의사 추가

    // 스케줄 추가

    // 쿼리
    console.log("===============")
    let find_bed_result = await query_FindEmergencyBed(10,5);
    console.log(`결과 2`)
    console.log(`${find_bed_result}`)
    bedA.isOccupied = true;
    bedB.isOccupied = true;
    await updateBed(bedA);
    await updateBed(bedB);
    console.log("===============")
    let find_bed_result_after = await query_FindEmergencyBed(10,5);
    console.log(`결과 2`)
    console.log(`${find_bed_result_after}`)
    console.log("===============")
*/