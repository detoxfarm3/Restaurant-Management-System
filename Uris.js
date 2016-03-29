"use strict";

var Uris;

module.exports = Uris = {
    BASE_URI: "/",
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
    toAbsoluteUri: toAbsoluteUri
}

function toAbsoluteUri(str) {
    str = str || "";
    return 'users-home#' + str.replace('(', '').replace(')', '');
}