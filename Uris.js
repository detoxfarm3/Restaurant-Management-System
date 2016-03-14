"use strict";

var Uris;

module.exports = Uris = {
    CREATE_USER: base('/create'),
    VIEW_USER: base('/view/:id'),
    EDIT_USER: base('/edit/:id'),
    CREATE_PRODUCT: base('/product/create'),
    SELL: {
        BASE: '/sell',
        CREATE: '/sell/create',
        VIEW: '/sell/view/:id',
        EDIT: '/sell/edit/:id',
    }
}

function base(str) {
    return str;
}