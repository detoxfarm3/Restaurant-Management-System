"use strict";
var React = require('react');
var OrderItemsTablePrint = require('./OrderItemsTablePrint');
var DateView = require('../DateView');

var PrintView = React.createClass({
    getDefaultProps: function () {
        return {
            sell: {}
        };
    },
    render: function () {
        var $this = this;
        var sell = $this.props.sell;
        var sellUnits = sell.sellUnits;

        var tdStyle = {'whiteSpace': 'nowrap', padding: '2px'};

        return (
            <div className="row" style={{'fontSize': '8px'}}>
                <div className="col-md-12">
                    <table className="table table-condensed" style={{marginBottom: '0'}}>
                        <tbody>
                        <tr>
                            <td style={tdStyle}>Transaction ID:</td>
                            <th style={tdStyle}>{sell.transactionId}</th>
                            <td style={tdStyle}>Order ID:</td>
                            <th style={tdStyle}>{sell.orderId}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-md-12" style={{marginBottom: '6px'}}>

                    <OrderItemsTablePrint sellUnits={sellUnits}/>

                </div>

            </div>
        );
    }
});

module.exports = PrintView;