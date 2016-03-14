"use strict";
var React = require('react');

var eb = require('./components/EventBus');

var App;
module.exports = App = React.createClass({
    getDefaultProps: function () {
        return {
            eb: {
                send: function () {
                },
                publish: function () {
                },
                registerHandler: function () {
                },
                unregisterHandler: function () {
                }
            }
        };
    },
    render: function () {
        var $this = this;
        var eb = $this.props.eb;

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