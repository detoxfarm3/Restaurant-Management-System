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

    if (eb.state != EventBus.OPEN) {

        //console.log("EVENT_BUS_RECONNECTING");
        //
        //eb = new EventBus('http://' + location.host + '/eventbus');
        //
        //eb.onopen = () => {
        //    console.log("EVENT_BUS_RECONNECTED");
        //    send.call(eb, address, message, headers, callback);
        //};
        //
        //eb.onerror = () => {
        //    console.log("EVENT_BUS_RECONNECT_FAILED");
        //    window.alert("Disconnected from server. Please login again.");
        //    location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);
        //    callback(new Error("Invalid state error."), null);
        //};

        console.log("EVENT_BUS_RECONNECT_FAILED");
        window.alert("Disconnected from server. Please login again.");
        location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);
        callback(new Error("Invalid state error."), null);

        return;
    }

    headers = headers || {};
    if (authSerice.isLoggedIn()) {
        headers['authToken'] = authSerice.authToken();
    } else {
        location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);
    }

    send.call(eb, address, message, headers, callback);
}

module.exports = () => eb;