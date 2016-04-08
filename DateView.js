"use strict";
var React = require('react');
var lib = require('../components/functions');
var DateView;
module.exports = DateView = React.createClass({
    getDefaultProps: function () {
        return {value: null};
    },
    render: function () {
        var $this = this;

        return (
            <span>{lib.formatDateTimeAmPm($this.props.value)}</span>
        );
    }
});