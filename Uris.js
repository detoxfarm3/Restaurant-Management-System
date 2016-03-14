"use strict";

var Uris;

module.exports = Uris = {
    CREATE_USER: base('/create'),
    VIEW_USER: base('/view/:id'),
    EDIT_USER: base('/edit/:id'),
    CREATE_PRODUCT: base('/product/create'),
    CREATE_SELL: base('/sell/create'),
}

function base(str) {
    return str;
}