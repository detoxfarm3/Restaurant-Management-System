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
            inventories: [],
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

        inventoryService.findAll()
            .then(rsp => $this.setState({inventories: rsp.data}))
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
            <div classNameName="panel panel-default">
                <div classNameName="panel-heading">
                    <div classNameName="row">
                        <div classNameName="col-md-6">
                            <h3 classNameName="panel-title">Add/Remove/Edit Products</h3>
                        </div>
                        <div classNameName="col-md-6">
                            <span classNameName="btn btn-success pull-right" onClick={$this.addAnotherProduct}>
                                Add another product</span>
                        </div>
                    </div>
                </div>

                <h4>
                    ID: <strong style={{fontWeight: 'bold'}} classNameName="text-primary">{inventory.id}</strong>
                    {' | '}Name: <strong style={{fontWeight: 'bold'}}
                                         classNameName="text-primary">{inventory.name}</strong>
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
                           title={<h3 classNameName="modal-title text-primary">Add another product</h3>}
                           body={
                                       <AddAnotherProductForm
                                           products={$this.filterProducts($this.state.products)}
                                           units={$this.state.units}
                                           product={$this.state.product}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                           footer={
                                        <div>
                                            <span classNameName="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span classNameName="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
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
                           title={<h3 classNameName="modal-title text-primary">Add another product</h3>}
                           body={
                                       <AddAnotherProductForm
                                           products={$this.filterProducts($this.state.products)}
                                           units={$this.state.units}
                                           product={$this.state.product}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                           footer={
                                        <div>
                                            <span classNameName="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span classNameName="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
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
                                   title={<h3 classNameName="modal-title text-primary">Add another product</h3>}
                                   body={
                                       <AddAnotherProductForm
                                           products={$this.filterProducts($this.state.products)}
                                           units={$this.state.units}
                                           product={{}}
                                           onChange={$this.onProductChange}
                                           onSubmit={$this.doAddAnother}
                                           />
                                    }
                                   footer={
                                        <div>
                                            <span classNameName="btn btn-primary btn-lg pull-right"
                                                onClick={$this.doAddAnother}>Add</span>
                                            <span classNameName="btn btn-danger btn-lg pull-right" style={{marginRight: '10px'}}
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
    filterProducts: function (products) {
        var $this = this;
        products = products || [];

        var mp = $this.state.inventoryProducts.reduce((map, prod) => {
            map[prod.productId] = prod.productId;
            return map;
        }, {});

        return products.filter(prod => {
            return !mp[prod.id];
        });
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
            <div classNameName="row">

                <div classNameName="col-md-3">

                    <input classNameName="form-control" type="number" name="__quantity__" value={item.__quantity__}
                           onChange={(e) => {
                                $this.onQuantityChange(e, item);
                           }}/>

                </div>

                <div classNameName="col-md-9">

                    <span classNameName="btn btn-primary" onClick={() => $this.doAdd(item)}
                          style={{marginRight: '5px'}}>Add</span>
                    <span classNameName="btn btn-success" onClick={() => $this.doRemove(item)}
                          style={{marginRight: '5px'}}>Remove</span>
                    <span classNameName="btn btn-danger" onClick={() => $this.editProduct(item)}
                          style={{marginRight: '5px'}}>Edit</span>

                    <span classNameName="btn btn-info" onClick={() => $this.transfer(item)}
                          style={{marginRight: '5px'}}>Transfer</span>

                    <span classNameName="btn btn-info" onClick={() => $this.bring(item)}
                          style={{marginRight: '5px'}}>Bring</span>

                    <span classNameName="btn btn-danger pull-right"
                          onClick={function (e) {
                            $this.removeItem(item);
                          }}>
                        <span classNameName="glyphicon glyphicon-remove" aria-hidden="true"></span>
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
                           title={<h3 classNameName="modal-title text-primary">Add</h3>}
                           body={
                               <AddRemoveEditForm
                               placeholder="Add"
                               onSubmit={$this.doAdd}
                               submitButton={<input type="submit" classNameName="btn btn-primary" value="Add"/>}/>
                           }
                           footer={<span classNameName="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
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
                           title={<h3 classNameName="modal-title text-success">Remove</h3>}
                           body={
                               <AddRemoveEditForm
                               placeholder="Remove"
                               onSubmit={$this.doRemove}
                               submitButton={<input type="submit" classNameName="btn btn-success" value="Remove"/>}/>
                           }
                           footer={<span classNameName="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
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
                           title={<h3 classNameName="modal-title text-danger">Edit</h3>}
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
                                   submitButton={<input type="submit" classNameName="btn btn-lg btn-danger" value="Edit"/>}/>
                           }
                           footer={<span classNameName="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
                        />
                );
            }
        });
    },

    transfer: function (inventory) {
        var $this = this;

        var body = (
            <form onSubmit={e => {e.preventDefault(); $this.doTransfer(inventory);}}>
                <div className="form-group">
                    <label forHtml="quantity">Quantity</label>
                    <input type="number" className="form-control"
                           id="quantity" name="quantity" value={inventory.__quantity__}/>
                </div>
                <div className="form-group">
                    <label forHtml="inventoryId">Invenotry</label>
                    <select className="form-control"
                            id="inventoryId" name="inventoryId" value={inventory.__transferTo__}>
                        <option value={0}>Select Inventory</option>
                        {
                            $this.state.inventories.map(inv => {
                                <option value={inv.id}>{inv.name}</option>
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Transfer</button>
            </form>
        );

        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 classNameName="modal-title text-danger">Transfer to another inventory</h3>}
                           body={body}
                           footer={<span classNameName="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
                        />
                );
            }
        });
    },

    bring: function (inventory) {
        var $this = this;
        this.setState({
            createModal: function () {
                return (
                    <Modal isOpen={true} onClose={$this.closeModal}
                           title={<h3 classNameName="modal-title text-danger">Transfer to another inventory</h3>}
                           body={''}
                           footer={<span classNameName="btn btn-danger" onClick={$this.closeModal}>Cancel</span>}
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
    doTransfer: function (inventory) {
    },
});

module.exports = AddRemoveEditProducts;