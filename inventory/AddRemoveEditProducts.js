"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');
var Modal = require('.././Modal');
var AddRemoveEditForm = require('./AddRemoveEditForm');
var AddAnotherProductForm = require('./AddAnotherProductForm');

var unitService = require('../unit/UnitService');
var inventoryService = require('./InventoryService');
var productService = require('../product/ProductService');

var AddRemoveEditProducts = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            units: [
                {id: 1, name: 'Kg'},
                {id: 2, name: 'Ml'},
                {id: 3, name: 'L'}
            ],
            unitsById: {},
            inventory: {id: 1, name: 'Inv-1'},
            createModal: function () {
            },
            inventoryProducts: [
                {
                    id: 23,
                    name: 'Name',
                    quantity: 13,
                    available: 54,
                    unitId: 1,
                    added: 23,
                    removed: 54
                },
                {
                    id: 24,
                    name: 'Name',
                    quantity: 13,
                    available: 54,
                    unitId: 2,
                    added: 23,
                    removed: 54
                },
                {
                    id: 25,
                    name: 'Name',
                    quantity: 13,
                    available: 54,
                    unitId: 3,
                    added: 23,
                    removed: 54
                }
            ],
            products: [],
            productsById: {},
            product: {}
        };
    },
    componentDidMount: function () {
        var $this = this;
        unitService.findAllUnits()
            .then(rsp => $this.setState({
                units: rsp.data,
                unitsById: rsp.data.reduce(function (rr, cc) {
                    rr[cc.id] = cc;
                    return rr;
                }, {})
            }))
        ;
        productService.findAllDecomposed()
            .then(rsp => $this.setState({
                products: rsp.data,
                productsById: rsp.data.reduce(function (rr, pro) {
                    rr[pro.id] = pro;
                    return rr;
                }, {})
            }))
        ;
        inventoryService.findAllProducts($this.props.params.id)
            .then(rsp => $this.setState({inventoryProducts: rsp.data}))
        ;
        inventoryService.find($this.props.params.id)
            .then(inventory => $this.setState({inventory: inventory}))
        ;
    },
    componentWillUnmount: function () {
    },
    render: function () {
        var $this = this;
        var inventoryProducts = $this.state.inventoryProducts || [];
        var no = 1;
        inventoryProducts.forEach(function (product) {
            product.no = no++;
        });
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
                            <span className="btn btn-success pull-right" onClick={$this.addAnotherProduct}>
                                Add another product</span>
                        </div>
                    </div>
                </div>

                <h4>
                    ID: <strong style={{fontWeight: 'bold'}} className="text-primary">{inventory.id}</strong>
                    {' | '}Name: <strong style={{fontWeight: 'bold'}} className="text-primary">{inventory.name}</strong>
                </h4>

                <BootstrapTable data={inventoryProducts} striped={true} hover={true}>

                    <TableHeaderColumn dataField="no">#</TableHeaderColumn>
                    <TableHeaderColumn hidden={true} isKey={true}
                                       dataField="id">ID</TableHeaderColumn>

                    <TableHeaderColumn dataField="name" dataFormat={$this.formatName}>Name</TableHeaderColumn>
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
    formatName: function (noval, inventoryProduct) {
        var $this = this;
        return ($this.state.productsById[inventoryProduct.productId] || {}).name;
    },
    formatUnit: function (unitId, product) {
        var $this = this;
        var unitsById = $this.state.unitsById || {};
        return (
            <span>{(unitsById[unitId] || {}).name}</span>
        );
    },
    addAnotherProduct: function (e) {
        var $this = this;
        $this.setState({
            product: {},
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-primary">Add another product</h3>}
                           body={
                                       <AddAnotherProductForm
                                           products={$this.state.products}
                                           units={$this.state.units}
                                           product={$this.state.product}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                           footer={
                                        <div>
                                            <span className="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span className="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
                                                onClick={$this.closeModal}>Cancel</span>
                                        </div>
                                    }
                        />
                );
            }
        });
    },
    onProductChange: function (e) {
        var $this = this;
        var product = $this.state.product || {};
        product[e.target.name] = e.target.value;

        console.log("product", product);

        $this.setState({
            product: product,
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-primary">Add another product</h3>}
                           body={
                                       <AddAnotherProductForm
                                           products={$this.state.products}
                                           units={$this.state.units}
                                           product={$this.state.product}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                           footer={
                                        <div>
                                            <span className="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span className="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
                                                onClick={$this.closeModal}>Cancel</span>
                                        </div>
                                    }
                        />
                );
            }
        });

    },
    doAddAnother: function (e) {
        var $this = this;
        e.preventDefault();
        inventoryService.insertProduct($this.state.product, $this.state.inventory.id)
            .then(() => {
                return inventoryService.findAllProducts($this.props.params.id)
                    .then(rsp => $this.setState({inventoryProducts: rsp.data}))
                    ;
            })
            .then(() => {

                $this.setState({
                    product: {},
                    createModal: function () {
                        return (
                            <Modal isOpen={true} onClose={$this.closeModal}
                                   title={<h3 className="modal-title text-primary">Add another product</h3>}
                                   body={
                                       <AddAnotherProductForm
                                           products={$this.state.products}
                                           units={$this.state.units}
                                           product={{}}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                                   footer={
                                        <div>
                                            <span className="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span className="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
                                                onClick={$this.closeModal}>Cancel</span>
                                        </div>
                                    }
                                />
                        );
                    }
                });
            })
        ;
    },
    removeItem: function (item) {
        var $this = this;
        inventoryService.deleteProduct(item.id)
            .then(() => inventoryService.findAllProducts($this.props.params.id))
            .then(rsp => $this.setState({inventoryProducts: rsp.data}))
        ;
    },
    onQuantityChange: function (e, item) {
        var $this = this;
        item.__quantity__ = e.target.value;
        $this.setState({
            inventoryProducts: $this.state.inventoryProducts
        });
    },
    formatAction: function (action, item) {
        var $this = this;
        return (
            <div className="row">

                <div className="col-md-3">

                    <input className="form-control" type="number" name="__quantity__" value={item.__quantity__}
                           onChange={(e) => {
                                $this.onQuantityChange(e, item);
                           }}/>

                </div>

                <div className="col-md-9">

                    <span className="btn btn-primary" onClick={() => $this.doAdd(item)}
                          style={{marginRight: '5px'}}>Add</span>
                    <span className="btn btn-success" onClick={() => $this.doRemove(item)}
                          style={{marginRight: '5px'}}>Remove</span>
                    <span className="btn btn-danger" onClick={() => $this.editProduct(item)}
                          style={{marginRight: '5px'}}>Edit</span>

                    <span className="btn btn-danger"
                          onClick={function (e) {
                            $this.removeItem(item);
                          }}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </span>

                </div>

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
    removeProduct: function (item) {
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
    editProduct: function (item) {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 className="modal-title text-danger">Edit</h3>}
                           body={
                               <AddRemoveEditForm
                                   placeholder="Edit"
                                   item={item}
                                   onChange={(e) => {
                                        item[e.target.name] = e.target.value;
                                        $this.setState({inventoryProducts: $this.state.inventoryProducts});
                                   }}
                                   units={$this.state.units}
                                   onSubmit={(e) => {
                                        e.preventDefault();
                                        $this.doEdit(item);
                                   }}
                                   submitButton={<input type="submit" className="btn btn-lg btn-danger" value="Edit"/>}/>
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
    doAdd: function (item) {
        var $this = this;

        inventoryService.addProduct(item.id, item.__quantity__)
            .then(() =>         inventoryService.findAllProducts($this.props.params.id))
            .then(rsp => $this.setState({inventoryProducts: rsp.data}))
        ;

        this.closeModal();
    },
    doRemove: function (item) {
        var $this = this;

        inventoryService.removeProduct(item.id, item.__quantity__)
            .then(() =>         inventoryService.findAllProducts($this.props.params.id))
            .then(rsp => $this.setState({inventoryProducts: rsp.data}))
        ;

        this.closeModal();
    },
    doEdit: function (item) {
        var $this = this;

        inventoryService.editProductQuantity(item.id, item.__quantity__, item.unitId)
            .then(() =>         inventoryService.findAllProducts($this.props.params.id))
            .then(rsp => $this.setState({inventoryProducts: rsp.data}))
        ;

        this.closeModal();
    },
});

module.exports = AddRemoveEditProducts;