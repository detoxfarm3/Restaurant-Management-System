var React = require('react');
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var lib = require('../components/functions');
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


        var totalCounter = {quantity: 0, total: 0};
        var serial = 1;
        sellUnits = Stream(sellUnits)
            .peek(function (unit) {
                totalCounter.quantity = totalCounter.quantity + (parseInt(unit.quantity) || 0);
                totalCounter.total = totalCounter.total + (parseInt(unit.total) || 0);
            })
            .map(function (unit) {
                return lib.merge2(unit, {
                    serial: serial++,
                    productId: unit.product.name,
                    unitId: unit.sellingUnit.name
                });
            })
            .toArray()
        ;

        sellUnits.push({
            productId: <strong>Total</strong>,
            quantity: <strong>{totalCounter.quantity}</strong>,
            total: <strong>{totalCounter.total}</strong>,
        });

        return (
            <BootstrapTable data={sellUnits} striped={true} hover={true}>

                <TableHeaderColumn isKey={true}
                                   dataField="serial">#</TableHeaderColumn>

                <TableHeaderColumn dataField="productId">Product</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>

                <TableHeaderColumn dataField="unitId">Unit</TableHeaderColumn>
                <TableHeaderColumn dataField="unitPrice">Unit
                    Price</TableHeaderColumn>

                <TableHeaderColumn dataField="total">Total</TableHeaderColumn>

            </BootstrapTable>
        );
    }
});