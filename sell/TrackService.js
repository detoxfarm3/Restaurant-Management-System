var eb = require('../EventBus');
var ee = require('../EventEmitter');

var ServerEvents = require('./ServerEvents');
var Events = require('./Events');
var Promise = require('bluebird');
var lib = require('../../components/functions');

class TrackService {

    findAll(params) {
        return new Promise(function (resolve, reject) {
            eb().send(ServerEvents.FIND_ALL_USERS, params, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + Events.USER_CREATED, err || msg);
                    return;
                }

                resolve(msg.body);
            });
        });
    }

    find(id) {
        return new Promise(function (resolve, reject) {
            eb().send(ServerEvents.FIND_USER, id, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + Events.USER_CREATED, err || msg);
                    return;
                }

                resolve(msg.body);
            });
        });
    }

    create(track) {
        return new Promise(function (resolve, reject) {

            track.forEach(tk => tk.productId = tk.id);

            console.log("SEND." + ServerEvents.CREATE_TRACK, JSON.stringify(track));

            eb().send(ServerEvents.CREATE_TRACK, track, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.CREATE_TRACK, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.CREATE_TRACK, msg.body);

                console.log(Events.CREATE_TRACK, track);
            });
        });
    }

    update(track) {

        track = track.forEach(tk => tk.productId = tk.id);

        return new Promise(function (resolve, reject) {

            console.log("SEND." + ServerEvents.UPDATE_TRACK, JSON.stringify(track));

            eb().send(ServerEvents.UPDATE_TRACK, track, null, function (err, msg) {
                if (!!err || !!msg.failureCode || !!(msg.body || {}).responseCode) {
                    reject(err || msg);

                    console.log("Error " + ServerEvents.UPDATE_TRACK, err || msg);
                    return;
                }

                resolve(msg.body);

                ee.emit(Events.SELL_UPDATED, msg.body);
            });
        });
    }

}

module.exports = new TrackService();