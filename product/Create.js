"use strict";
import React from 'react'
var Modal = require('.././Modal');
var SingleProductViewShort = require('./SingleProductViewShort');
var ProductsUnitWisePriceEditable = require('./ProductsUnitWisePriceEditable');
var lib = require('.././functions');
var ProductsUnitWisePrice = require('./ProductsUnitWisePrice');
var NewUnitDialog = require('./../unit/NewUnitDialog');
var ProductsInventoryEditable = require('./ProductsInventoryEditable');

var productService = require('./ProductService');
var unitService = require('../unit/UnitService');
var Uris = require('../Uris');

var auth = require('../AuthService');

var CreateProduct;
module.exports = CreateProduct = React.createClass({
    getInitialState: function () {
        return {
            product: {forSale: true},
            prices: [],
            productInventories: [
                {
                    id: Math.random(),
                    inventory: {id: 1, name: 'Inv-2'},
                    quantity: 545,
                    available: 545,
                    unitId: 1
                },
                {
                    id: Math.random(),
                    inventory: {id: 1, name: 'Inv-2'},
                    quantity: 545,
                    available: 545,
                    unitId: 1
                },
                {
                    id: Math.random(),
                    inventory: {id: 1, name: 'Inv-2'},
                    quantity: 545,
                    available: 545,
                    unitId: 1
                }
            ],
            createModal: function () {
                return {title: '', body: '', isOpen: false};
            },
            productsUnitWisePriceEditable: {},
            units: [{id: 1, name: 'Lb'}, {id: 2, name: 'Kg'}, {id: 3, name: 'Ltr'}],
            inventories: [{id: 1, name: 'Lb'}, {id: 2, name: 'Kg'}, {id: 3, name: 'Ltr'}],
        };
    },
    componentDidMount: function () {
        var $this = this;
        unitService.findAllUnits()
            .then(rsp => $this.setState({units: rsp.data}))
        ;
    },
    componentWillUnmount: function () {

    },
    render: function () {
        var $this = this;
        var product = $this.state.product || {forSale: true};
        var prices = $this.state.prices || [];
        var productInventories = $this.state.productInventories || [];

        var createModal = $this.state.createModal;
        var modal = !!createModal ? createModal() || {} : {};
        var units = $this.state.units || [];
        var inventories = $this.state.inventories;

        if (auth.currentUser().username != "admin") {
            return (
                <h2>You do not have right to create product.</h2>
            );
        }

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">

                                <div className="col-md-9">
                                    <h3 className="panel-title">
                                        Create Product
                                    </h3>
                                </div>

                                <div className="col-md-3">
                                    <div className="btn-group btn-group-justified">

                                        <span className="btn btn-danger">Clear</span>

                                <span className="btn btn-primary"
                                      onClick={$this.createProduct}>Create</span>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="panel-body">

                            <form>

                                <div className="row">

                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Name"
                                               name="name" value={product.name} onChange={$this.onProductChange}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="sku">SKU</label>
                                        <input type="text" className="form-control" id="sku" placeholder="SKU"
                                               name="sku" value={product.sku} onChange={$this.onProductChange}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="manufacturerPrice">Manufacturer Price</label>
                                        <input type="number" className="form-control" id="manufacturerPrice"
                                               placeholder="Manufacturer Price"
                                               name="manufacturerPrice"
                                               value={product.manufacturerPrice}
                                               onChange={$this.onProductChange}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="manufacturerPriceUnitId">Manufacturer Price Unit</label>

                                        <select className="form-control"
                                                id="manufacturerPriceUnitId" name="manufacturerPriceUnitId"
                                                value={product.manufacturerPriceUnitId}
                                                onChange={$this.onProductChange}>
                                            <option id={0} value={0}>Select Unit</option>

                                            {
                                                units.map(function (unit) {
                                                    return (
                                                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                                                    );
                                                })
                                            }

                                        </select>

                                    </div>

                                    <div className="form-group col-md-12">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="forSale" value={product.forSale}
                                                       checked={!!product.forSale}
                                                       onChange={e => {
                                                            product.forSale = !product.forSale;
                                                            $this.setState({product: product});
                                                       }}
                                                    /> For Sale
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="remarks">Remarks</label>
                                        <textarea className="form-control" id="remarks" placeholder="Remarks"
                                                  name="remarks" value={product.remarks}
                                                  onChange={$this.onProductChange}/>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3 className="panel-title">Price</h3>
                                </div>
                                <div className="col-md-6">
                                    <span className="btn btn-danger pull-right"
                                          onClick={$this.addMoreUnitWisePrice}>Add New</span>
                                    <span className="btn btn-success pull-right"
                                          onClick={$this.createNewUnit}
                                          style={{marginRight: '5px'}}>Create New Unit</span>
                                </div>
                            </div>
                        </div>
                        <ProductsUnitWisePriceEditable productsUnitWisePrice={prices}
                                                       units={units}
                                                       onInit={function (editable) {
                                                            $this.setState({productsUnitWisePriceEditable: editable});
                                                       }}
                                                       onChange={$this.onProductsUnitWisePriceChange}/>
                    </div>

                    <Modal title={modal.title} body={modal.body} isOpen={!!modal.isOpen} onClose={modal.onClose}
                           footer={modal.footer} bodyStyle={modal.bodyStyle}/>

                    <NewUnitDialog onInit={$this.onNewUnitInit}/>

                </div>
            </div>
        );
    },
    onProductChange: function (e) {
        var $this = this;

        var product = $this.state.product || {};
        product[e.target.name] = e.target.value;
        $this.setState({product: product});
    },
    removeItem: function (item, inventories) {
        var $this = this;
        $this.setState({
            product: lib.merge2($this.state.product, {
                inventories: inventories.filter(function (inv) {
                    return inv !== item;
                })
            })
        });
    },
    onInventoriesChange: function (e, invRel, inventories) {
        var $this = this;
        invRel[e.target.name] = e.target.value;

        $this.setState({
            product: lib.merge2($this.state.product, {
                inventories: inventories
            })
        });

        console.log('invRel', JSON.stringify(invRel));
    },
    onNewUnitInit: function (newUnitDialog) {
        var $this = this;
        $this.newUnitDialog = newUnitDialog;
    },
    addMoreUnitWisePrice: function () {
        this.state.productsUnitWisePriceEditable.addMoreUnitWisePrice();
    },
    createProduct: function () {
        var $this = this;

        console.log('product', JSON.stringify($this.state.product));

        productService
            .create(lib.merge2($this.state.product, {
                prices: $this.state.prices
            }))
            .then(productService.find)
            .then($this.showSuccessDialog)
        ;
    },

    showSuccessDialog: function (product) {
        var $this = this;

        function onClose() {
            $this.setState({
                createModal: function () {
                    return {isOpen: false};
                }
            });
        }

        $this.setState({
            createModal: function () {
                return {
                    isOpen: true,
                    onClose: onClose,
                    title: 'Product Creation Successful.',
                    body: (
                        <div className="row">

                            <div className="col-md-12">
                                <SingleProductViewShort product={product}/>
                            </div>

                        </div>
                    ),
                    footer: (
                        <div>
                            <div className="btn btn-primary" onClick={onClose}>Ok</div>
                            <a href={Uris.toAbsoluteUri(Uris.PRODUCT.EDIT, {id: product.id})}
                               className="btn btn-success pull-left">Edit</a>
                            <a href={Uris.toAbsoluteUri(Uris.PRODUCT.VIEW, {id: product.id})}
                               className="btn btn-success pull-left">View Details</a>
                        </div>
                    ),
                    bodyStyle: {paddingTop: 0}
                };
            }
        });
    },
    createNewUnit: function () {
        var $this = this;
        $this.newUnitDialog.createNewUnit();
    },
    onProductsUnitWisePriceChange: function (productsUnitWisePrice) {
        var $this = this;
        $this.setState({
            prices: productsUnitWisePrice
        });
    },
})