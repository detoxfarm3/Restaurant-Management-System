var eb = require('../EventBus');
var ee = require('../EventEmitter');

var ServerEvents = require('./ServerEvents');
var Events = require('./Events');
var Promise = require('bluebird');
var lib = require('../../components/functions');

class SellService {

    findAll(params) {
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.FIND_ALL_SELLS, params, null, function (err, msg) {

                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_ALL_SELLS, err || msg);
                    return;
                }

                resolve(msg.body);

                console.log(ServerEvents.FIND_ALL_SELLS, JSON.stringify(msg.body));

            });
        });
    }

    find(id) {
        return new Promise(function (resolve, reject) {
            eb.send(ServerEvents.FIND_SELL, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.FIND_SELL, err || msg);
                    return;
                }

                msg.body.sellDate = new Date(msg.body.sellDate);
                resolve(msg.body);

                console.log(ServerEvents.FIND_SELL, msg.body);
            });
        });
    }

    create(product) {
        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.CREATE_SELL, JSON.stringify(product));

            eb.send(ServerEvents.CREATE_SELL,
                lib.merge2(product, {'sellDate': product.sellDate.toJSON()}), null, function (err, msg) {
                    if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                        reject(err || msg);

                        console.log("Error " + ServerEvents.CREATE_SELL, err || msg);
                        return;
                    }

                    resolve(msg.body);

                    ee.emit(Events.SELL_CREATED, msg.body);

                    console.log(Events.SELL_CREATED, product);
                });
        });
    }

    update(product) {
        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.UPDATE_SELL, JSON.stringify(product));

            eb.send(ServerEvents.UPDATE_SELL, product, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.UPDATE_SELL, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.SELL_UPDATED, msg.body);
            });
        });
    }

    delete(id) {
        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.DELETE_SELL, id);

            eb.send(ServerEvents.DELETE_SELL, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.DELETE_SELL, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.SELL_DELETED, msg.body);
            });
        });
    }
}

module.exports = new SellService();