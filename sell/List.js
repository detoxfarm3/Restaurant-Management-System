"use strict";
import React from 'react'
import { browserHistory } from 'react-router';

var SellHeader = require('./SellHeader');
var OrderItemsTable = require('./OrderItemsTable');

var Uris = require('../Uris');
var lib = require('../../components/functions');

var sellService = require('./SellService');

var ListSells;
module.exports = ListSells = React.createClass({
    getDefaultProps: function () {
        return {
            params: {
                tab: 1
            }
        };
    },
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
                    sellDate: null,
                    remarks: '',
                    sellUnits: [
                        {
                            product: {
                                id: 1,
                                name: 'Dibba'
                            },
                            quantity: 5,
                            unit: {
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
                            unit: {
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
                            unit: {
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
                            unit: {
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
                            unit: {
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
                            unit: {
                                id: 1,
                                name: 'Cup'
                            },
                            unitPrice: 500,
                            total: 8000,
                            remarks: 'Some Note'
                        },
                    ],
                }
            ]
        };
    },
    componentDidMount: function () {
        var $this = this;
        sellService.findAll()
            .then(rsp => {
                $this.setState({sells: rsp.data, pagination: rsp.pagination});
            })
        ;
    },
    componentWillUnmount: function () {
    },
    render: function () {
        var $this = this;
        var sells = $this.state.sells;

        return (
            <div className="panel panel-primary">
                <div className="panel-body">

                    {
                        sells.map(function (sell) {

                            var sellUnits = sell.sellUnits || [];

                            return (

                                <div key={sell.transactionId} className="row" style={{marginBottom: '10px'}}>
                                    <div className="col-md-12">

                                        <div className="alert alert-success" style={{marginBottom: '0px'}}>

                                            <div className="row">
                                                <div className="col-md-10">

                                                    <SellHeader sell={sell}/>

                                                </div>

                                                <div className="col-md-2">

                                                    <div className="btn-group pull-right">
                                                        <button type="button"
                                                                className="btn btn-default dropdown-toggle"
                                                                data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false">
                                                            <span
                                                                className="caret"></span></button>
                                                        <ul className="dropdown-menu">
                                                            <li><a
                                                                href={Uris.toAbsoluteUri(Uris.SELL.VIEW, {id: sell.id})}>View
                                                                Order</a></li>
                                                            <li role="separator" className="divider"></li>
                                                            <li><a
                                                                href={Uris.toAbsoluteUri(Uris.SELL.EDIT, {id: sell.id})}>Edit
                                                                Order</a></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">

                                                <OrderItemsTable sellUnits={sellUnits}/>

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
    },
    switchToTab: function (tab) {
        console.log("tab", tab);
        browserHistory.push(Uris.toAbsoluteUri(lib.parameterize(Uris.SELL.BASE, {tab: tab})));
    }
})