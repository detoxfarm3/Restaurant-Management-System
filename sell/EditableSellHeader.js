"use strict";

var React = require('react');
var DateTimePicker = require('react-widgets').DateTimePicker;

var EditSellHeader;
module.exports = EditSellHeader = React.createClass({
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
            <form className="form-horizontal">
                <div className="row">


                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="transactionId" className="col-sm-4 control-label">Transaction ID:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="transactionId" placeholder="Transaction ID"
                                       readOnly={true}
                                       name="transactionId" value={sell.transactionId}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="orderId" className="col-sm-4 control-label">Order ID:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="orderId" placeholder="Order ID"
                                       readOnly={true}
                                       name="orderId" value={sell.orderId}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="createdBy" className="col-sm-4 control-label">Created By:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="createdBy" placeholder="Created By"
                                       readOnly={true}
                                       name="createdBy" value={(sell.createdBy || {}).name}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="sellDate" className="col-sm-4 control-label">Sell Date:</label>

                            <div className="col-sm-8">
                                <DateTimePicker id="sellDate"
                                                name="sellDate" value={sell.sellDate}
                                                onChange={date => $this.props.onChange({target: {name: 'sellDate', value: date}})}/>
                            </div>
                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="consumerName" className="col-sm-4 control-label">Consumer Name:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="consumerName"
                                       placeholder="Consumer Name"
                                       name="consumerName" value={sell.consumerName} onChange={$this.props.onChange}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="consumerMobile" className="col-sm-4 control-label">Consumer Mobile:</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="consumerMobile"
                                       placeholder="Consumer Mobile"
                                       name="consumerMobile" value={sell.consumerMobile}
                                       onChange={$this.props.onChange}/>
                            </div>
                        </div>

                    </div>

                </div>
            </form>
        );
    }
});