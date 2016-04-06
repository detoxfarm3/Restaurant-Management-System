var React = require('react');

var ProductsInventoryView = React.createClass({
    getDefaultProps: function () {
        return {
            inventories: []
        };
    },
    render: function () {
        var $this = this;
        var inventories = $this.props.inventories || [];

        return !inventories.length ? <span></span> : (
            <table className="table table-condensed" style={{margin: 0}}>
                <thead>
                <tr>
                    <th>Inventory</th>
                    <th colSpan="1">Quantity</th>
                    <th colSpan="1">Available</th>
                    <th colSpan="1">Unit</th>
                </tr>
                </thead>
                <tbody>
                {
                    inventories.map(function (inv) {
                        return (
                            <tr key={Math.random()}>
                                <th>{(inv.inventory || {}).name}</th>
                                <th>{inv.quantity}</th>
                                <th>{inv.available}</th>
                                <th>{(inv.unit || {}).name}</th>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
});

module.exports = ProductsInventoryView;