var keyDownListeners = [];

window.onkeydown = function (e) {
    keyDownListeners.forEach(listener => {
        try {
            listener(e);
        } catch (ex) {
            console.error(e);
        }
    });
};

exports.addKeyDownListener = (listener) => {
    if (keyDownListeners.indexOf(ll => ll === listener) >= 0) {
        console.info('preventing_duplicate_key_down_listener_add');
        return;
    }
    keyDownListeners.push(listener);
};

exports.removeKeyDownListener = (listener) => {
    keyDownListeners.splice(keyDownListeners.indexOf(ll => ll === listener), 1);
};

exports.addAllKeyDownListeners = (listenerList) => {
    listenerList = listenerList || [];
    listenerList.forEach(listener => exports.addKeyDownListener(listener));
};

exports.removeAllKeyDownListeners = (listenerList) => {
    listenerList = listenerList || [];
    listenerList.forEach(ll => exports.removeKeyDownListener(ll))
};


var keyUpListeners = [];

window.onkeyup = function (e) {
    keyUpListeners.forEach(listener => {
        try {
            listener(e);
        } catch (ex) {
            console.error(e);
        }
    });
};

exports.addKeyUpListener = (listener) => {
    keyUpListeners.push(listener);
};

exports.removeKeyUpListener = (listener) => {
    keyUpListeners.splice(keyUpListeners.indexOf(ll => ll === listener), 1);
};


