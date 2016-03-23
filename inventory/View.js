"use strict";
var React = require('react');
var InventorySummary = require('./InventorySummary');

var ViewInventory;
module.exports = ViewInventory = React.createClass({
    getDefaultProps: function () {
        return {
            params: {}
        };
    },
    getInitialState: function () {
        return {
            inventory: {
                summary: [
                    {
                        product: 'Kabab',
                        quantity: {amount: 45, unit: {id: 1, name: 'lg'}},
                        added: {amount: 45, unit: {id: 1, name: 'lg'}},
                        removed: {amount: 45, unit: {id: 1, name: 'lg'}}
                    },
                    {
                        product: 'Kabab',
                        quantity: {amount: 45, unit: {id: 1, name: 'lg'}},
                        added: {amount: 45, unit: {id: 1, name: 'lg'}},
                        removed: {amount: 45, unit: {id: 1, name: 'lg'}}
                    },
                    {
                        product: 'Kabab',
                        quantity: {amount: 45, unit: {id: 1, name: 'lg'}},
                        added: {amount: 45, unit: {id: 1, name: 'lg'}},
                        removed: {amount: 45, unit: {id: 1, name: 'lg'}}
                    },
                    {
                        product: 'Kabab',
                        quantity: {amount: 45, unit: {id: 1, name: 'lg'}},
                        added: {amount: 45, unit: {id: 1, name: 'lg'}},
                        removed: {amount: 45, unit: {id: 1, name: 'lg'}}
                    },
                ]
            }
        };
    },
    render: function () {
        var $this = this;
        var inventory = $this.state.inventory || {};
        console.log($this.props.params);
        return (

            <div classNameName="row">
                <div classNameName="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3 className="panel-title">Inventory Details</h3>
                                </div>
                                <div className="col-md-6">

                                    <div className="btn-group pull-right">

                                        <span className="btn btn-primary">Edit Inventory</span>

                                        <span className="btn btn-success">Add/Remove/Edit Products</span>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <table className="table table-striped">
                            <tbody>
                            <tr>
                                <th>ID:</th>
                                <td>{inventory.id}</td>
                                <th>Name:</th>
                                <td>{inventory.name}</td>
                            </tr>
                            <tr>
                                <th>Remarks:</th>
                                <td colSpan="3">{inventory.remarks}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3 className="panel-title">Inventory Summary</h3>
                                </div>
                                <div className="col-md-6">
                                    <div className="btn-group pull-right">

                                        <span className="btn btn-primary">
                                            Today
                                        </span>
                                        <span className="btn btn-success">
                                            This Week
                                        </span>
                                        <span className="btn btn-warning">
                                            This Month
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">

                            <InventorySummary summary={inventory.summary}/>

                        </div>
                    </div>

                </div>
            </div>
        );
    },
});