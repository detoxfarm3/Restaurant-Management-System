var EventBus = require("vertx3-eventbus-client");
var document = require('./document');
var authSerice = require('./AuthService');
var Uris = require('./Uris');

var handlers = [];  //address, headers, callback

function newEventBus(onOpenHandler) {

    onOpenHandler = onOpenHandler || (() => null);

    var _onOpen = () => {
        window.document.removeEventListener('EVENT_BUS_CONNECTED', _onOpen);
        onOpenHandler();
    };

    window.document.addEventListener('EVENT_BUS_CONNECTED', _onOpen);

    var eb = new EventBus('http://' + location.host + '/eventbus');

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

    return eb;
}

var eb = newEventBus();

var reconnect = function (callback) {

    callback = callback || (() => null);

    console.log("EVENT_BUS_RECONNECTING");

    var _closeHandler = () => {

        window.document.removeEventListener('EVENT_BUS_DISCONNECTED', _closeHandler);

        eb = newEventBus(() => {

            handlers.forEach(reg => {
                const {address, headers, callback} = reg;
                eb.registerHandler(address, headers, callback);
            });

            window.setTimeout(() => {

                if (eb.state !== EventBus.OPEN) {

                    console.log("EVENT_BUS_RECONNECT_FAILED");
                    window.alert("Disconnected from server. Please login again.");
                    location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);

                    return;
                }

            }, 2000);

            console.log("EVENT_BUS_RECONNECTED");

            callback();

        });
    };

    window.document.addEventListener('EVENT_BUS_DISCONNECTED', _closeHandler);

    eb.close();

}

var send = function (address, message, headers, callback) {

    function _send() {
        headers = headers || {};
        if (authSerice.isLoggedIn()) {
            headers['authToken'] = authSerice.authToken();
        } else {
            location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI);
        }

        eb.send(address, message, headers, callback);
    }

    if (eb.state !== EventBus.OPEN) {

        reconnect(() => {
            _send();
        });
    }

    _send();
};

/**
 * Publish a message
 *
 * @param {String} address
 * @param {Object} message
 * @param {Object} [headers]
 */
var publish = function (address, message, headers) {

    eb.publish(address, message, headers);
};

/**
 * Register a new handler
 *
 * @param {String} address
 * @param {Object} [headers]
 * @param {Function} callback
 */
var registerHandler = function (address, headers, callback) {

    handlers.push({address, headers, callback});

    eb.registerHandler(address, headers, callback);
};

/**
 * Unregister a handler
 *
 * @param {String} address
 * @param {Object} [headers]
 * @param {Function} callback
 */
var unregisterHandler = function (address, headers, callback) {

    handlers = handlers.filter(h => !((h.address === address) && (h.headers === headers) && (h.callback === callback)));

    eb.unregisterHandler(address, headers, callback);
};

/**
 * Closes the connection to the EvenBus Bridge.
 */
var close = function () {
    eb.close();
};


module.exports = (() => {
    return {reconnect, send, publish, registerHandler, unregisterHandler, close};
});