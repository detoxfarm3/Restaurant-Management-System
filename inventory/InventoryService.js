var eb = require('../EventBus');
var ee = require('../EventEmitter');

var ServerEvents = require('./ServerEvents');
var Events = require('./Events');
var Promise = require('bluebird');

class InventoryService {
    findAll(params) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_ALL_INVENTORIES, params, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_ALL_INVENTORIES, err || msg);
                    return;
                }

                resolve(msg.body);

            });
        });
    }

    find(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_INVENTORY, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);
            });
        });
    }

    create(product) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.CREATE_INVENTORY, product, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.CREATE_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.INVENTORY_CREATED, msg.body);

                console.log(Events.INVENTORY_CREATED, product);
            });
        });
    }

    update(product) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.UPDATE_INVENTORY, product, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.UPDATE_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.INVENTORY_UPDATED, msg.body);
            });
        });
    }

    delete(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.DELETE_INVENTORY, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.DELETE_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.INVENTORY_DELETED, msg.body);
            });
        });
    }
}

module.exports = new InventoryService();