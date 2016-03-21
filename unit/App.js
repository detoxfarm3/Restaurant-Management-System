"use strict";
var React = require('react');

var UnitApp;
module.exports = UnitApp = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    render: function () {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    {this.props.children}

                </div>
            </div>
        );
    }
});