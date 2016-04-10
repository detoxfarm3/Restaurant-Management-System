"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');

var NewInventoryDialog = require('./NewInventoryDialog');

var inventoryService = require("./InventoryService");
var ee = require('../EventEmitter');
var Events = require('./Events');
var Uris = require('../Uris');
var auth = require('../AuthService');

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
    componentDidMount: function () {
        var $this = this;

        $this.listeners = [];
        var update = () => {
            inventoryService.findAll()
                .then(rsp => $this.setState({inventories: rsp.data}))
            ;
        };

        $this.listeners.push({event: Events.INVENTORY_CREATED, listener: update});
        ee.on(Events.INVENTORY_CREATED, update);

        inventoryService.findAll()
            .then(rsp => $this.setState({inventories: rsp.data}))
        ;
    },
    componentWillUnmount: function () {
        var $this = this;
        $this.listeners.forEach(lis => ee.removeListener(lis.event, lis.listener));
    },
    render: function () {
        var $this = this;
        var inventories = $this.state.inventories || [];

        var editable = auth.currentUser().username == "admin";

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
                                    {
                                        auth.currentUser().username != "admin" ? null : (
                                            <span className="btn btn-primary pull-right"
                                                  onClick={$this.createNewInventory}>New</span>
                                        )
                                    }
                                </div>
                            </div>

                        </div>

                        <BootstrapTable data={inventories} cellEdit={$this.cellEditProp()}>
                            <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name" editable={editable}>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="totalProducts" editable={false}>
                                Total Products</TableHeaderColumn>
                            <TableHeaderColumn dataField="remarks" editable={editable}>Remarks</TableHeaderColumn>
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

                <a href={Uris.toAbsoluteUri(Uris.INVENTORY.ADD_REMOVE_EDIT_PRODUCTS, {id: inventory.id})}
                   className="btn btn-primary" style={{marginRight: '5px'}}
                   title="Add product to this inventory.">
                    Add/Remove/Edit Products
                </a>

                <a href={Uris.toAbsoluteUri(Uris.INVENTORY.VIEW, {id: inventory.id})}
                   className="btn btn-success"
                   style={{marginRight: '5px'}} title="View this inventory.">
                    View
                </a>

                {
                    auth.currentUser().username != "admin" ? null : (
                        <span className="btn btn-danger" title="Delete this inventory."
                              onClick={() => $this.deleteInventory(inventory.id)}>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </span>
                    )
                }

            </div>
        );
    },
    deleteInventory: function (id) {
        var $this = this;
        inventoryService.delete(id)
            .then(() => {
                inventoryService.findAll()
                    .then(rsp => $this.setState({inventories: rsp.data}))
                ;
            })
        ;
    },
    cellEditProp: function () {
        var $this = this;
        return {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: $this.onAfterSaveCell
        };
    },
    onAfterSaveCell: function (inventory) {
        var $this = this;
        inventoryService.update(inventory)
            .then(() => {
                inventoryService.findAll()
                    .then(rsp => $this.setState({inventories: rsp.data}))
                ;
            })
        ;
    }
});