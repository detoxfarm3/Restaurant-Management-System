var $ = require('jquery');

function ajax(params) {
    $.ajax(params);
}

module.exports = {
    ajax: ajax
};