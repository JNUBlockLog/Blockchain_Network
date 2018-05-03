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
 * Logistics imports Materials from outer world
 * @param {org.factory.importRequest} importRequest
 * @transaction
 */
async function importRequest(tx) {
    let event = getFactory().newEvent('org.factory','importRequested');
    event.worker = tx.worker
    event.unit = tx.unit;
    emit(event)
}
/**
 * Logistics completes imports Materials from outer world
 * @param {org.factory.importComplete} importComplete
 * @transaction
 */
async function importComplete(tx) {
    let event = getFactory().newEvent('org.factory','importCompeleted');
    event.worker = tx.worker
    event.unit = tx.unit;
    emit(event)
}
/**
 * Logistics completes imports Materials from outer world
 * @param {org.factory.moveRequest} moveRequest
 * @transaction
 */
async function moveRequest(tx) {
    let event = getFactory().newEvent('org.factory','moveRequested');
    event.worker = tx.worker
    event.unit = tx.unit;
    emit(event)
}