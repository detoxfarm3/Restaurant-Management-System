"use strict";
var React = require('react');

var App;
module.exports = App = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    render: function () {
        var $this = this;

        return (
            <div id="app" className="container">

                <div className="row">
                    <div className="col-md-12">
                        Header
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">

                        {this.props.children}

                    </div>
                </div>

            </div>
        );
    }
});