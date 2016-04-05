var React = require('react');
var PricePerUnit = React.createClass({
    getDefaultProps: function () {
        return {
            price: '',
            unit: '',
            style: {}
        }
    },
    render: function () {
        var $this = this;
        var price = $this.props.price;
        var unit = $this.props.unit;
        return !price ? <span></span> : (
            <span style={$this.props.style || {}}>{price} / {unit}</span>
        );
    }
});

module.exports = PricePerUnit;