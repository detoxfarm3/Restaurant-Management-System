"use strict";

var React = require('react');
var DateView = require('../DateView');

var SellHeader;
module.exports = SellHeader = React.createClass({
    getDefaultProps: function () {
        return {
            sell: {
                remarks: null
            }
        };
    },
    render: function () {
        var $this = this;
        var dlStyle = {marginBottom: '5px'};
        var sell = $this.props.sell;
        return (
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
                        <dd>{(sell.createdBy || {}).name}</dd>
                    </dl>

                </div>

                <div className="col-md-6">

                    <dl className="dl-horizontal" style={dlStyle}>
                        <dt>Sell Date:</dt>
                        <dd><DateView value={sell.sellDate}/></dd>
                    </dl>

                </div>

                <div className="col-md-6">

                    <dl className="dl-horizontal" style={dlStyle}>
                        <dt>Consumer Name:</dt>
                        <dd>{sell.consumerName}</dd>
                    </dl>

                </div>

                <div className="col-md-6">

                    <dl className="dl-horizontal" style={dlStyle}>
                        <dt>Consumer Mobile:</dt>
                        <dd>{sell.consumerMobile}</dd>
                    </dl>

                </div>

            </div>
        );
    }
});