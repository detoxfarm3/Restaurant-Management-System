var React = require('react');

var QuantityInUnitView = React.createClass({
    getDefaultProps: function () {
        return {
            quantity: null,
            unit: null,
        };
    },
    render: function () {
        return !this.props.quantity ? null : (
            <span>{this.props.quantity} {this.props.unit}</span>
        );
    }
});

module.exports = QuantityInUnitView;