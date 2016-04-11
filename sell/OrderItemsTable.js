var React = require('react');
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var lib = require('.././functions');
var Stream = require('streamjs');

var OrderItemsTable;
module.exports = OrderItemsTable = React.createClass({
    getDefaultProps: function () {
        return {
            sellUnits: []
        };
    },
    render: function () {
        var $this = this;
        var sellUnits = $this.props.sellUnits || [];

        var totalCounter = {quantity: 0.0, total: 0.0};
        var serial = 1;
        sellUnits = Stream(sellUnits)
            .peek(function (unit) {
                totalCounter.quantity = totalCounter.quantity + (parseFloat(unit.quantity) || 0.0);
                totalCounter.total = totalCounter.total + (parseFloat(unit.total) || 0.0);
            })
            .map(function (sellUnit) {
                return lib.merge2(sellUnit, {
                    serial: serial++,
                    productName: sellUnit.product.name,
                    unitName: sellUnit.unit.name,
                    unitPrice: !sellUnit.unitPrice ? null : sellUnit.unitPrice.toFixed(2),
                    total: !sellUnit.total ? null : sellUnit.total.toFixed(2),
                });
            })
            .toArray()
        ;

        sellUnits.push({
            productId: <strong>Total</strong>,
            quantity: <strong>{totalCounter.quantity}</strong>,
            total: <strong>{!totalCounter.total ? null : totalCounter.total.toFixed(2)}</strong>,
        });

        return (
            <BootstrapTable data={sellUnits} striped={true} hover={true}>

                <TableHeaderColumn isKey={true}
                                   dataField="serial">#</TableHeaderColumn>

                <TableHeaderColumn dataField="productName">Product</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataAlign="right">Quantity</TableHeaderColumn>

                <TableHeaderColumn dataField="unitName">Unit</TableHeaderColumn>
                <TableHeaderColumn dataField="unitPrice" dataAlign="right">
                    Unit Price</TableHeaderColumn>

                <TableHeaderColumn dataField="total" dataAlign="right">Total</TableHeaderColumn>

            </BootstrapTable>
        );
    }
});