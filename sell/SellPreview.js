"use strict";
var React = require('react');
var OrderItemsTable = require('./OrderItemsTable');

var SellPreview = React.createClass({
    getDefaultProps: function () {
        return {
            sell: {}
        };
    },
    render: function () {
        var $this = this;
        var sell = $this.props.sell;
        var sellUnits = sell.sellUnits;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-condensed" style={{marginBottom: '0'}}>
                        <tbody>
                        <tr>
                            <td>Transaction ID:</td>
                            <th>{sell.transactionId}</th>
                            <td>Order ID:</td>
                            <th>{sell.orderId}</th>
                        </tr>
                        <tr>
                            <td>Consumer Name:</td>
                            <th>{sell.consumerName}</th>
                            <td>Consumer Mobile:</td>
                            <th>{sell.consumerMobile}</th>
                        </tr>
                        <tr>
                            <td>Created By:</td>
                            <th>{(sell.createdBy || {}).name}</th>
                            <td>Sale Date:</td>
                            <th>{sell.sellDate}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-12" style={{marginBottom: '6px'}}>

                    <OrderItemsTable sellUnits={sellUnits}/>

                </div>


                {
                    !sell.remarks ? "" : (
                        <div className="col-md-12">
                            <form className="form-horizontal">
                                <div className="form-group">

                                    <label htmlFor="remarks" className="col-sm-2 control-label"
                                           style={{textAlign: 'left'}}>Remarks:</label>

                                    <div className="col-sm-10">
                                                <textarea className="form-control" rows="3"
                                                          placeholder="Remarks" readOnly={true}
                                                          name="remarks" value={sell.remarks}></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }


            </div>
        );
    }
});

module.exports = SellPreview;