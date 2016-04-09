//..................................................................................
//Create EventBus

var EventBus = require("vertx3-eventbus-client");
var eb = new EventBus('http://' + location.host + '/eventbus');
var document = require('./document');
var authSerice = require('./AuthService');
var Uris = require('./Uris');

eb.onopen = function onopen() {

    console.info("EVENT_BUS OPENED");

    var event = new Event('EVENT_BUS_CONNECTED');

    document.dispatchEvent(event);
}

eb.onclose = function () {

    console.info("EVENT_BUS CLOSED");

    var event = new Event('EVENT_BUS_DISCONNECTED');

    document.dispatchEvent(event);
}

var send = eb.send;

eb.send = function (address, message, headers, callback) {

    headers = headers || {};
    if (authSerice.isLoggedIn()) {
        headers['authToken'] = authSerice.authToken();
    } else {
        location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);
    }

    send.call(eb, address, message, headers, callback);
}

module.exports = eb;