"use strict";

var Uris;

module.exports = Uris = {
    BASE_URI: "/",
    API: {
        BASE_URI: "/",
    },
    USER: {
        CREATE: '/user/create',
        VIEW: '/user/view/:id',
        EDIT: '/user/edit/:id',
        BASE: '/user/index/:tab',
    },
    SELL: {
        CREATE: '/sell/create',
        VIEW: '/sell/view/:id',
        EDIT: '/sell/edit/:id',
        BASE: '/sell/index/:tab',
    },
    PRODUCT: {
        CREATE: '/product/create',
        VIEW: '/product/view/:id',
        EDIT: '/product/edit/:id',
        BASE: '/product/index/:tab',
    },
    UNIT: {
        BASE: '/unit/index',
    },
    FIELD: {
        CREATE: '/field/create',
        VIEW: '/field/view/:id',
        EDIT: '/field/edit/:id',
        BASE: '/field/index/:tab',
    },
    INVENTORY: {
        VIEW: '/inventory/view/:id',
        BASE: '/inventory/index',
    },
    toAbsoluteUri: toAbsoluteUri
}

function toAbsoluteUri(str) {
    return 'users-home#' + str;
}