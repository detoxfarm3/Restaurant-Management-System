var eb = require('../EventBus');
var ee = require('../EventEmitter');

var ServerEvents = require('./ServerEvents');
var Events = require('./Events');
var Promise = require('bluebird');

class ProductService {

    findAll(params) {
        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.CREATE_PRODUCT, JSON.stringify(product));

            eb.send(ServerEvents.FIND_ALL_PRODUCTS, params, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_ALL_PRODUCTS, err || msg);
                    return;
                }

                resolve(msg.body);

                console.log(ServerEvents.FIND_ALL_PRODUCTS, msg.body);

            });
        });
    }

    find(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_PRODUCT, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_PRODUCT, err || msg);
                    return;
                }

                resolve(msg.body);

                console.log(ServerEvents.FIND_PRODUCT, msg.body);
            });
        });
    }

    findDecomposed(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_PRODUCT_DECOMPOSED, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_PRODUCT_DECOMPOSED, err || msg);
                    return;
                }

                resolve(msg.body);

                console.log(ServerEvents.FIND_PRODUCT_DECOMPOSED, msg.body);
            });
        });
    }

    create(product) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.CREATE_PRODUCT, product, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.CREATE_PRODUCT, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.PRODUCT_CREATED, msg.body);

                console.log(Events.PRODUCT_CREATED, product);
            });
        });
    }

    update(product) {
        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.UPDATE_PRODUCT, JSON.stringify(product));

            eb.send(ServerEvents.UPDATE_PRODUCT, product, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.UPDATE_PRODUCT, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.PRODUCT_UPDATED, msg.body);
            });
        });
    }

    delete(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.DELETE_PRODUCT, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.DELETE_PRODUCT, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.PRODUCT_DELETED, msg.body);
            });
        });
    }
}

module.exports = new ProductService();