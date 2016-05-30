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

        var ptbl = React.createElement(
            'table',
            { className: 'table table-condensed', style: { marginBottom: '0' } },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                        'Product'
                    ),
                    React.createElement(
                        'th',
                        {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                        'Qty'
                    ),
                    React.createElement(
                        'th',
                        {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                        'Unit'
                    ),
                    React.createElement(
                        'th',
                        {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                        'Price'
                    ),
                    React.createElement(
                        'th',
                        {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                        'Total'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                sellUnits.map(function (sUnit) {
                    return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                            sUnit.productName
                        ),
                        React.createElement(
                            'td',
                            {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                            sUnit.quantity
                        ),
                        React.createElement(
                            'td',
                            {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                            sUnit.unitName
                        ),
                        React.createElement(
                            'td',
                            {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                            sUnit.unitPrice
                        ),
                        React.createElement(
                            'td',
                            {style: {'whiteSpace': 'nowrap', padding: '2px'}},
                            sUnit.total
                        )
                    )
                })
            )
        );

        return ptbl;
    }
});