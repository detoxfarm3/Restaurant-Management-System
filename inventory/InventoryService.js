var eb = require('../EventBus');
var ee = require('../EventEmitter');

var ServerEvents = require('./ServerEvents');
var Events = require('./Events');
var Promise = require('bluebird');

class InventoryService {

    findAllProducts(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_ALL_INVENTORY_PRODUCTS, id, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_ALL_INVENTORY_PRODUCTS, err || msg);
                    return;
                }

                resolve(msg.body);

                console.log(ServerEvents.FIND_ALL_INVENTORY_PRODUCTS, msg);

            });
        });
    }

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

    insertProduct(inventoryProduct, id) {

        inventoryProduct['inventoryId'] = id || inventoryProduct['inventoryId'];

        console.log("SEND." + ServerEvents.INSERT_INVENTORY_PRODUCT, inventoryProduct);

        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.INSERT_INVENTORY_PRODUCT, inventoryProduct, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.INVENTORY_PRODUCT_INSERTED, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.INVENTORY_PRODUCT_INSERTED, msg.body);
            });
        });
    }

    deleteProduct(inventoryProductId) {

        console.log("SEND." + ServerEvents.DELETE_INVENTORY_PRODUCT, inventoryProductId);

        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.DELETE_INVENTORY_PRODUCT, inventoryProductId, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.DELETE_INVENTORY_PRODUCT, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.INVENTORY_PRODUCT_DELETED, msg.body);
            });
        });
    }

    addProduct(id, quantity) {

        var payload = {id, quantity};

        console.log("SEND." + ServerEvents.ADD_PRODUCT_TO_INVENTORY, payload);

        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.ADD_PRODUCT_TO_INVENTORY, payload, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.ADD_PRODUCT_TO_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.PRODUCT_ADDED_TO_INVENTORY, msg.body);
            });
        });
    }

    removeProduct(id, quantity) {

        var payload = {id, quantity};

        console.log("SEND." + ServerEvents.REMOVE_PRODUCT_FROM_INVENTORY, payload);

        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.REMOVE_PRODUCT_FROM_INVENTORY, payload, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.REMOVE_PRODUCT_FROM_INVENTORY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.PRODUCT_REMOVED_FROM_INVENTORY, msg.body);
            });
        });
    }

    editProductQuantity(id, quantity, unitId) {

        var payload = {id, quantity, unitId};

        console.log("SEND." + ServerEvents.EDIT_INVENTORY_PRODUCT_QUANTITY, payload);

        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.EDIT_INVENTORY_PRODUCT_QUANTITY, payload, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.EDIT_INVENTORY_PRODUCT_QUANTITY, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.EDIT_INVENTORY_PRODUCT_QUANTITY, msg.body);
            });
        });
    }

    transferTo(req) {

    }

    bringFrom(req) {

    }
}

module.exports = new InventoryService();