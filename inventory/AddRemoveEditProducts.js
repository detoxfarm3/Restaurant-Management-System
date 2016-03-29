"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');
var Modal = require('.././Modal');
var AddRemoveEditForm = require('./AddRemoveEditForm');
var AddAnotherProductForm = require('./AddAnotherProductForm');

var AddRemoveEditProducts = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            units: {
                1: {id: 1, name: 'Kg'},
                2: {id: 2, name: 'Ml'},
                3: {id: 3, name: 'L'}
            },
            inventory: {id: 1, name: 'Inv-1'},
            createModal: function () {
            },
            products: [
                {
                    id: 23,
                    quantity: 13,
                    available: 54,
                    unitId: 1,
                    added: 23,
                    removed: 54
                },
                {
                    id: 24,
                    quantity: 13,
                    available: 54,
                    unitId: 2,
                    added: 23,
                    removed: 54
                },
                {
                    id: 25,
                    quantity: 13,
                    available: 54,
                    unitId: 3,
                    added: 23,
                    removed: 54
                }
            ]
        };
    },
    render: function () {
        var $this = this;
        var products = $this.state.products;
        var createModal = $this.state.createModal || function () {
            };
        var inventory = $this.state.inventory || {};
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="panel-title">Add/Remove/Edit Products</h3>
                        </div>
                        <div className="col-md-6">
                            <span className="btn btn-success pull-right" onClick={$this.addAnotherProduct}>Add another product</span>
                        </div>
                    </div>
                </div>

                <h4>
                    ID: <strong style={{fontWeight: 'bold'}} className="text-primary">{inventory.id}</strong>
                    {' | '}Name: <strong style={{fontWeight: 'bold'}} className="text-primary">{inventory.name}</strong>
                </h4>

                <BootstrapTable data={products} striped={true} hover={true}>
                    <TableHeaderColumn isKey={true} dataField="id">#</TableHeaderColumn>
                    <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>
                    <TableHeaderColumn dataField="added">Added</TableHeaderColumn>
                    <TableHeaderColumn dataField="removed">Removed</TableHeaderColumn>
                    <TableHeaderColumn dataField="unitId" dataFormat={$this.formatUnit}>Unit</TableHeaderColumn>
                    <TableHeaderColumn dataField="action" dataFormat={$this.formatAction}>Action</TableHeaderColumn>
                </BootstrapTable>

                {
                    createModal()
                }

            </div>
        );
    },
    formatUnit: function (unitId, product) {
        var $this = this;
        var units = $this.state.units || {};
        return (
            <span>{(units[unitId] || {}).name}</span>
        );
    },
    addAnotherProduct: function (e) {
        var $this = this;
        $this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-primary">Add another product</h3>}
                           body={<AddAnotherProductForm/>}
                           footer={
                                <div>
                                    <span className="btn btn-primary pull-right" onClick={$this.closeModal}>Add</span>
                                    <span className="btn btn-danger pull-right" style={{marginRight: '10px'}}
                                    onClick={$this.doAddAnother}>Cancel</span>
                                </div>
                           }
                        />
                );
            }
        });
    },
    doAddAnother: function () {
        var $this = this;
        $this.closeModal();
    },
    removeItem: function (item) {
        var $this = this;
        $this.setState({
            products: $this.state.products.filter(function (itm) {
                return item !== itm;
            })
        });
    },
    formatAction: function (action, item) {
        var $this = this;
        return (
            <div>

                <span className="btn btn-primary" onClick={$this.addProduct}
                      style={{marginRight: '5px'}}>Add</span>
                <span className="btn btn-success" onClick={$this.removeProduct}
                      style={{marginRight: '5px'}}>Remove</span>
                <span className="btn btn-danger" onClick={$this.editProduct}
                      style={{marginRight: '5px'}}>Edit</span>

                <span className="btn btn-danger"
                      onClick={function (e) {
                        $this.removeItem(item);
                      }}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </span>

            </div>
        );
    },

    addProduct: function () {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-primary">Add</h3>}
                           body={
                               <AddRemoveEditForm
                               placeholder="Add"
                               onSubmit={$this.doAdd}
                               submitButton={<input type="submit" className="btn btn-primary" value="Add"/>}/>
                           }
                           footer={<span className="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
                        />
                );
            }
        });
    },
    removeProduct: function () {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-success">Remove</h3>}
                           body={
                               <AddRemoveEditForm
                               placeholder="Remove"
                               onSubmit={$this.doRemove}
                               submitButton={<input type="submit" className="btn btn-success" value="Remove"/>}/>
                           }
                           footer={<span className="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
                        />
                );
            }
        });
    },
    editProduct: function () {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-danger">Edit</h3>}
                           body={
                               <AddRemoveEditForm
                               placeholder="Edit"
                               onSubmit={$this.doEdit}
                               submitButton={<input type="submit" className="btn btn-danger" value="Edit"/>}/>
                           }
                           footer={<span className="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
                        />
                );
            }
        });
    },
    closeModal: function () {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={false} onClose={$this.closeModal}/>
                );
            }
        });
    },
    doAdd: function (e) {
        e.preventDefault();
        console.log('Submit', e.target);
        this.closeModal();
    },
    doRemove: function (e) {
        e.preventDefault();
        console.log('Submit', e.target);
        this.closeModal();
    },
    doEdit: function (e) {
        e.preventDefault();
        console.log('Submit', e.target);
        this.closeModal();
    },
});

module.exports = AddRemoveEditProducts;