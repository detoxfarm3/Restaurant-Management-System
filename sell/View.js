"use strict";
var React = require('react');
var SellHeader = require('./SellHeader');
var OrderItemsTable = require('./OrderItemsTable');
var sellService = require('./SellService');
var Uris = require('../Uris');

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
                sellDate: null,
                remarks: 'RMM'
            }
        }
    },
    componentDidMount: function () {
        var $this = this;
        sellService.find($this.props.params.id)
            .then(sell => $this.setState({sell: sell}))
        ;
    },
    render: function () {
        var $this = this;
        var sell = $this.state.sell;
        var dlStyle = {marginBottom: '5px'};

        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="panel-title" style={{lineHeight: '28px', fontSize: '20px'}}>
                                        Order Details
                                    </h3>
                                </div>

                                <div className="col-md-2">
                                    <a href={Uris.toAbsoluteUri(Uris.SELL.CREATE)}
                                       className="btn btn-primary btn-block pull-right">
                                        Create New
                                    </a>
                                </div>

                                <div className="col-md-2">
                                    <a href={Uris.toAbsoluteUri(Uris.SELL.EDIT, {id: $this.props.params.id})}
                                       className="btn btn-warning btn-block pull-right">
                                        Edit
                                    </a>
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

                    {
                        !sell.remarks ? "" : (
                            <div className="col-md-6">

                                <dl className="dl-horizontal" style={dlStyle}>
                                    <dt>Remarks:</dt>
                                    <dd>{sell.remarks}</dd>
                                </dl>

                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
});