var React = require('react');
var QuantityInUnitView = require('../utils/QuantityInUnitView');

var InventorySummary = React.createClass({
    getDefaultProps: function () {
        return {
            summary: []
        };
    },
    render: function () {
        var $this = this;
        var summary = $this.props.summary || [];

        return (
            <table className="table table-striped">

                <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Added</th>
                    <th>Removed</th>
                </tr>
                </thead>

                <tbody>

                {
                    summary.map(function (sm, index) {
                        return (
                            <tr key={(index + 1) + '.'}>
                                <td>{index + 1}</td>
                                <td>{sm.product}</td>
                                <td>{$this.formatQuantity(sm.quantity)}</td>
                                <td>{$this.formatQuantity(sm.added)}</td>
                                <td>{$this.formatQuantity(sm.removed)}</td>
                            </tr>
                        );
                    })
                }

                </tbody>

            </table>
        );
    },
    formatQuantity: function (quantity) {
        return (
            <QuantityInUnitView quantity={quantity.amount} unit={quantity.unit.name}/>
        );
    }
});

module.exports = InventorySummary;