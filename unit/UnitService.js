"use strict";
var Promise = require('bluebird');

var ServerEvents = require('../ServerEvents');
var eb = require('../EventBus');
var ee = require('../EventEmitter');
var Events = require('../Events');

class UnitService {

    findAllUnits(params) {
        var $this = this;
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.FIND_ALL_UNITS, params, null, function (err, msg) {
                if (!!err || !!msg.failureCode) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(msg.body);
            });

        });
    }

    findUnit(id) {
        var $this = this;
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.FIND_UNIT, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(msg.body);
            });

        });
    }

    create(unit) {
        var $this = this;
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.CREATE_UNIT, unit, null, function (err, msg) {
                if (!!err || !!msg.failureCode) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.UNIT_CREATED);
            });

        });
    }

    update(unit) {
        var $this = this;
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.UPDATE_UNIT, unit, null, function (err, msg) {
                if (!!err || !!msg.failureCode) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.UNIT_UPDATED);

            });

        });
    }

    delete(id) {
        var $this = this;
        return new Promise(function (resolve, reject) {

            eb.send(ServerEvents.DELETE_UNIT, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.UNIT_DELETED);
            });

        });
    }
}

module.exports = new UnitService();