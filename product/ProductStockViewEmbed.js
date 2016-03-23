var React = require('react');

var ProductStockViewEmbed = React.createClass({
    getDefaultProps: function () {
        return {
            quantities: []
        };
    },
    render: function () {
        return this.formatStockQuantity(this.props.quantities);
    },

    formatStockQuantity: function (quantities) {
        var $this = this;
        quantities = quantities || [];

        return (
            <table className="table table-condensed" style={{margin: 0}}>
                <tbody>
                {
                    quantities.map(function (q) {
                        return (
                            <tr key={q.id}>
                                <td>{(q.inventory || {}).name}:</td>
                                <td>{$this.formatQuantity(q.quantity)}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    },
    formatQuantity: function (quantity) {
        quantity = quantity || {};
        return quantity.amount + ' ' + (quantity.unit || {}).name
    },
});

module.exports = ProductStockViewEmbed;