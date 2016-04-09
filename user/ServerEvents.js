"use strict";

var ServerEvents;
module.exports = ServerEvents = {
    "FIND_ALL_USERS": "UM.FIND_ALL_USERS",
    "FIND_USER": "UM.FIND_USER",

    "CREATE_USER": "UM.CREATE_USER",
    "UPDATE_USER": "UM.UPDATE_USER",
    "DELETE_USER": "UM.DELETE_USER",

    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

console.log(module.exports);