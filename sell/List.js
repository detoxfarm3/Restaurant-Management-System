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
            params: {}
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
        var form = $this.state.form || {};

        return (
            <div className="panel panel-primary">
                <div className="panel-body">

                    <form onSubmit={e => {
                        e.preventDefault();
                        $this.submitForm(form);
                    }}>
                        <div className="form-group col-md-2">
                            <label htmlFor="s.transactionId">Transaction ID</label>
                            <input type="text" className="form-control" id="s.transactionId"
                                   name="s.transactionId" value={form['s.transactionId']}
                                   onChange={e => {
                                        form[e.target.name] = e.target.value;
                                        $this.setState({form: form});
                                   }}
                                   placeholder="Transaction ID"/>
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="s.orderId">Order ID</label>
                            <input type="text" className="form-control" id="s.orderId"
                                   name="s.orderId" value={form['s.orderId']}
                                   onChange={e => {
                                        form[e.target.name] = e.target.value;
                                        $this.setState({form: form});
                                   }}
                                   placeholder="Order ID"/>
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="s.status">Status</label>

                            <select className="form-control" id="s.status"
                                    name="s.status" value={form['s.status']}
                                    onChange={e => {
                                        form[e.target.name] = e.target.value;
                                        $this.setState({form: form});
                                   }}>

                                {
                                    ["Select", "Holding", "Created"].map(function (op, ind) {
                                        return (
                                            <option key={ind} value={ind}>{op}</option>
                                        );
                                    })
                                }

                            </select>
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="s.consumerMobile">Consumer Mobile</label>
                            <input type="text" className="form-control" id="s.consumerMobile"
                                   name="s.consumerMobile" value={form['s.consumerMobile']}
                                   onChange={e => {
                                        form[e.target.name] = e.target.value;
                                        $this.setState({form: form});
                                   }}
                                   placeholder="Consumer Mobile"/>
                        </div>

                        <div className="form-group col-md-2 pull-right">
                            <input type="submit" className="btn btn-primary btn-lg pull-right"
                                   style={{marginTop: '4px'}} value="Submit"/>
                        </div>

                    </form>

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
    submitForm: function (form) {
        var $this = this;

        var ps = parseInt(form['s.status']);

        form = lib.merge2(form, {
            's.status': ps == 0 ? null : ps == 1 ? false : ps == 2 ? true : null
        });

        sellService.findAll(form)
            .then(rsp => {
                $this.setState({sells: rsp.data, pagination: rsp.pagination});
            })
        ;
    }
})