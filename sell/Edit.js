"use strict";
var React = require('react');

var EditSell;
module.exports = EditSell = React.createClass({
    getDefaultProps: function () {
        return {
            params: {
                id: null
            }
        };
    },
    render: function () {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    EditSell: {$this.props.params.id}

                </div>
            </div>
        );
    }
});