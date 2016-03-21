"use strict";
import React from 'react'
var Modal = require('../components/Modal');
var SingleProductViewShort = require('./SingleProductViewShort');
var ProductsUnitWisePriceEditable = require('./ProductsUnitWisePriceEditable');
var lib = require('../components/functions');
var UnitWisePrice = require('./UnitWisePrice');
var NewUnitDialog = require('./../unit/NewUnitDialog');

var CreateProduct;
module.exports = CreateProduct = React.createClass({
    getInitialState: function () {
        return {
            product: {unitWisePrice: []},
            createModal: function () {
                return {title: '', body: '', isOpen: false};
            },
            productsUnitWisePriceEditable: {}
        };
    },
    render: function () {
        var $this = this;
        var product = $this.state.product || {};
        var createModal = $this.state.createModal;
        var modal = !!createModal ? createModal() || {} : {};
        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">

                                <div className="col-md-9">
                                    <h3 className="panel-title">
                                        Edit Product
                                    </h3>
                                </div>

                                <div className="col-md-3">
                                    <div className="btn-group btn-group-justified">

                                        <span className="btn btn-danger">Clear</span>

                                <span className="btn btn-primary"
                                      onClick={$this.createProduct}>Update</span>

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
                                               name="name" value={product.name}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="sku">SKU</label>
                                        <input type="text" className="form-control" id="sku" placeholder="SKU"
                                               name="sku" value={product.sku}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="price">Price</label>
                                        <input type="number" className="form-control" id="price" placeholder="Price"
                                               name="price" value={product.price}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="manufacturerPrice">Manufacturer Price</label>
                                        <input type="number" className="form-control" id="manufacturerPrice"
                                               placeholder="Manufacturer Price"
                                               name="manufacturerPrice" value={product.manufacturerPrice}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="stockQuantity">Stock Quantity</label>
                                        <input type="number" className="form-control" id="stockQuantity"
                                               placeholder="Stock Quantity"
                                               name="stockQuantity" value={product.stockQuantity}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="available">Available</label>
                                        <input type="number" className="form-control" id="available"
                                               placeholder="Available"
                                               name="available" value={product.available}/>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="remarks">Remarks</label>
                                        <textarea className="form-control" id="remarks" placeholder="Remarks"
                                                  name="remarks" value={product.remarks}/>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3 className="panel-title">Product's unit wise price</h3>
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
                        <ProductsUnitWisePriceEditable productsUnitWisePrice={product.unitWisePrice}
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
    onNewUnitInit: function (newUnitDialog) {
        var $this = this;
        $this.newUnitDialog = newUnitDialog;
    },
    addMoreUnitWisePrice: function () {
        this.state.productsUnitWisePriceEditable.addMoreUnitWisePrice();
    },
    createProduct: function () {
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
                    title: 'Product update Successful.',
                    body: (
                        <div className="row">
                            <div className="col-md-12">
                                <SingleProductViewShort product={$this.state.product}/>
                            </div>

                            <div className="col-md-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">Unit Wise Prie</div>
                                    <UnitWisePrice unitWisePrice={$this.state.product.unitWisePrice}/>
                                </div>
                            </div>

                        </div>
                    ),
                    footer: (
                        <div>
                            <div className="btn btn-primary" onClick={onClose}>Ok</div>
                            <a href="#" className="btn btn-success pull-left">View Details</a>
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
            product: lib.merge2($this.state.product, {
                unitWisePrice: productsUnitWisePrice
            })
        });
    },
});