/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Move device Location.
 * @param {org.factory.moveDeviceLocation} moveDeviceLocation
 * @transaction
 */
async function moveDeviceLocation(tx) {
    tx.device.department = tx.department

    let event = getFactory().newEvent('org.factory','deviceLocationMoved');
    event.device = tx.device
    event.department = tx.department;
    emit(event)
}

/**
 * Change Device Manager
 * @param {org.factory.changeDeviceManager} changeDeviceManager
 * @transaction
 */
async function changeDeviceManager(tx) {
    tx.device.DeviceManager = tx.manager
    
    let assetRegistry = await getAssetRegistry('org.factory.Device');

    // Update the asset in the asset registry.
 	await assetRegistry.update(tx.device);
  	
  	let event = getFactory().newEvent('org.factory','deviceManagerChanged');
  	event.device = tx.device.DeviceID
    event.manager = tx.manager
    emit(event)
}

/**
 * Refresh Device
 * @param {org.factory.refreshDevice} refreshDevice
 * @transaction
 */
async function refreshDevice(tx) {
  	let event = getFactory().newEvent('org.factory','refreshRequest');
    emit(event)
}

/**
 * Refresh Device
 * @param {org.factory.updateDeviceStatus} updateDeviceStatus
 * @transaction
 */
async function updateDeviceStatus(tx) {
  tx.device.CPUInfomation = tx.CPUInfomation
  tx.device.MACAddress = tx.MACAddress
  tx.device.Processes = tx.Processes
  tx.device.DeviceType = tx.DeviceType
  tx.device.DeviceDesc = tx.DeviceDesc
  
  let assetRegistry = await getAssetRegistry('org.factory.Device');
  await assetRegistry.update(tx.device);
  
  let event = getFactory().newEvent('org.factory','deviceUpdated');
  event.device = tx.device
  emit(event)
}