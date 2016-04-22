"use strict";

var lib = require('../components/functions');

var Uris;

module.exports = Uris = {
    BASE_URI: "/",
    LOGIN_URI: '/login',
    SELL_INVENTORY_TRACK: {
        CREATE: '/sell-inventory-track/create',
        UPDATE: '/sell-inventory-track/edit/:productId',
        BASE: '/sell-inventory-track/index',
    },
    USER: {
        CREATE: '/user/create',
        VIEW: '/user/view/:id',
        EDIT: '/user/edit/:id',
        BASE: '/user/index',
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
        BASE: '/product/index',
    },
    UNIT: {
        BASE: '/unit/index',
    },
    FIELD: {
        CREATE: '/field/create',
        VIEW: '/field/view/:id',
        EDIT: '/field/edit/:id',
        BASE: '/field/index',
    },
    INVENTORY: {
        CREATE: '/inventory/create',
        VIEW: '/inventory/view/:id',
        BASE: '/inventory/index',
        ADD_REMOVE_EDIT_PRODUCTS: '/inventory/:id/add-remove-edit-products',
    },
    toAbsoluteUri: toAbsoluteUri,
    parameterize: lib.parameterize
}

function toAbsoluteUri(str, params) {

    str = str || "";

    str = lib.parameterize(str, params);

    return 'users-home#' + str.replace('(', '').replace(')', '');
}