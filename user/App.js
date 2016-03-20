"use strict";
var React = require('react');

var UserApp;
module.exports = UserApp = React.createClass({
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