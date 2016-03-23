"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');

var NewInventoryDialog = require('./NewInventoryDialog');

var ListInventories;
module.exports = ListInventories = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            inventories: [
                {id: '1', name: 's', remarks: 'rr', totalProducts: 12},
                {id: '2', name: 's', remarks: 'rr', totalProducts: 14},
                {id: '3', name: 's', remarks: 'rr', totalProducts: 75},
                {id: '4', name: 's', remarks: 'rr', totalProducts: 147},
            ]
        };
    },
    render: function () {
        var $this = this;
        var inventories = $this.state.inventories || [];

        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">

                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="panel-title">Inventory List [ total: {inventories.length} ]</h3>
                                </div>
                                <div className="col-md-4">
                                    <span className="btn btn-primary pull-right"
                                          onClick={$this.createNewInventory}>New</span>
                                </div>
                            </div>

                        </div>

                        <BootstrapTable data={inventories} cellEdit={$this.cellEditProp()}>
                            <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="totalProducts" editable={false}>
                                Total Products</TableHeaderColumn>
                            <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" editable={false}
                                               dataFormat={$this.formatAction}>Action</TableHeaderColumn>
                        </BootstrapTable>

                    </div>

                    <NewInventoryDialog onInit={$this.onNewInventoryDialogInit}/>

                </div>
            </div>
        );
    },
    onNewInventoryDialogInit: function (ref) {
        this.newInventoryDialog = ref;
    },
    createNewInventory: function () {
        var $this = this;
        $this.newInventoryDialog.createNewInventory();
    },
    formatAction: function (ac, inventory) {
        var $this = this;
        return (
            <div>

                <span className="btn btn-primary" style={{marginRight: '5px'}} title="Add product to this inventory."
                      onClick={function () {
                            $this.addRemoveProducts(inventory);
                      }}>
                    Add/Remove Products
                </span>

                <a className="btn btn-success" style={{marginRight: '5px'}} title="View this inventory.">
                    View
                </a>

                <span className="btn btn-danger" title="Delete this inventory."
                      onClick={function () {
                            $this.deleteInventory(inventory);
                      }}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </span>

            </div>
        );
    },
    addRemoveProducts: function (inventory) {
    },
    deleteInventory: function (inventory) {
        var $this = this;
        $this.setState({
            inventories: $this.state.inventories.filter(function (u) {
                return u != inventory;
            })
        });
    },
    cellEditProp: function () {
        var $this = this;
        return {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: $this.onAfterSaveCell
        };
    },
    onAfterSaveCell: function (row, cellName, cellValue) {
        var $this = this;
    }
});