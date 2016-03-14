"use strict";
import React from 'react'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var lib = require('../components/functions');
var Stream = require('streamjs');

var ListSells;
module.exports = ListSells = React.createClass({
    getInitialState: function () {
        return {
            sells: [
                {
                    transactionId: Math.random(),
                    orderId: 15,
                    createdBy: {
                        id: 1,
                        name: 'khanki'
                    },
                    sellDate: '15-Dec-2015 12:10:15 PM',
                    remarks: '',
                    sellUnits: [
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                    ],
                },
                {
                    transactionId: Math.random(),
                    orderId: 15,
                    createdBy: {
                        id: 1,
                        name: 'khanki'
                    },
                    sellDate: '15-Dec-2015 12:10:15 PM',
                    remarks: '',
                    sellUnits: [
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                    ],
                },
                {
                    transactionId: Math.random(),
                    orderId: 15,
                    createdBy: {
                        id: 1,
                        name: 'khanki'
                    },
                    sellDate: '15-Dec-2015 12:10:15 PM',
                    remarks: '',
                    sellUnits: [
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            sellingUnit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                    ],
                },
            ]
        };
    },
    render: function () {
        var $this = this;
        var sells = $this.state.sells;

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Order History</h3>
                </div>
                <div className="panel-body">
                    {
                        sells.map(function (sell) {
                            var dlStyle = {marginBottom: '5px'};
                            var sellUnits = sell.sellUnits || [];


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

                                <div key={sell.transactionId} className="row" style={{marginBottom: '10px'}}>
                                    <div className="col-md-12">

                                        <div className="alert alert-success" style={{marginBottom: '0px'}}>

                                            <div className="row">
                                                <div className="col-md-6">

                                                    <dl className="dl-horizontal" style={dlStyle}>
                                                        <dt>Transaction ID:</dt>
                                                        <dd>{sell.transactionId}</dd>
                                                    </dl>

                                                </div>

                                                <div className="col-md-6">

                                                    <dl className="dl-horizontal" style={dlStyle}>
                                                        <dt>Order ID:</dt>
                                                        <dd>{sell.orderId}</dd>
                                                    </dl>

                                                </div>

                                                <div className="col-md-6">

                                                    <dl className="dl-horizontal" style={dlStyle}>
                                                        <dt>Created By:</dt>
                                                        <dd>{sell.createdBy.name}</dd>
                                                    </dl>

                                                </div>

                                                <div className="col-md-6">

                                                    <dl className="dl-horizontal" style={dlStyle}>
                                                        <dt>Sell Date:</dt>
                                                        <dd>{sell.sellDate}</dd>
                                                    </dl>

                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <button className="btn btn-primary pull-right">
                                                        View Details
                                                    </button>
                                                    <button className="btn btn-warning pull-right"
                                                            style={{marginRight: '5px'}}>
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">

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

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
})