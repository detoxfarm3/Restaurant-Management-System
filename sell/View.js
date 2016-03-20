"use strict";
var React = require('react');
var SellHeader = require('./SellHeader');
var OrderItemsTable = require('./OrderItemsTable');

var ViewSell;
module.exports = ViewSell = React.createClass({
    getDefaultProps: function () {
        return {
            params: {
                id: null
            }
        };
    },
    getInitialState: function () {
        return {
            sell: {
                transactionId: Math.random(),
                orderId: 15,
                createdBy: {
                    id: 1,
                    name: 'khanki'
                },
                sellDate: '15-Dec-2015 12:10:15 PM',
                remarks: 'RMM'
            }
        }
    },
    render: function () {
        var $this = this;
        var sell = $this.state.sell;

        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="panel-title" style={{lineHeight: '28px', fontSize: '20px'}}>
                                        Order Details
                                    </h3>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-warning btn-block pull-right">
                                        Edit Transaction
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">

                            <SellHeader sell={sell}/>

                        </div>
                    </div>


                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="panel-title" style={{lineHeight: '28px', fontSize: '20px'}}>
                                        Items
                                    </h3>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">

                            <OrderItemsTable sellUnits={sell.sellUnits}/>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
});