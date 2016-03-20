"use strict";
import React from 'react'
var Modal = require('../components/Modal');
var SingleProductViewShort = require('./SingleProductViewShort');

var EditProduct;
module.exports = EditProduct = React.createClass({
    getInitialState: function () {
        return {product: {}, modal: {title: '', body: '', isOpen: false}};
    },
    render: function () {
        var $this = this;
        var product = $this.state.product || {};
        var modal = $this.state.modal || {};
        return (
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
                                      onClick={$this.updateProduct}>Update</span>

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
                                <textarea className="form-control" id="remarks" name="remarks" value={product.remarks}/>
                            </div>

                        </div>

                    </form>


                    <Modal title={modal.title} body={modal.body} isOpen={!!modal.isOpen} onClose={modal.onClose}
                           footer={modal.footer} bodyStyle={modal.bodyStyle}/>

                </div>
            </div>
        );
    },
    updateProduct: function () {
        var $this = this;

        function onClose() {
            $this.setState({
                modal: {isOpen: false}
            });
        }

        $this.setState({
            modal: {
                isOpen: true,
                onClose: onClose,
                title: 'Product Upldate Successful.',
                body: <SingleProductViewShort product={$this.state.product}/>,
                footer: (
                    <div>
                        <div className="btn btn-primary" onClick={onClose}>Ok</div>
                        <a href="#" className="btn btn-success pull-left">View Details</a>
                    </div>
                ),
                bodyStyle: {paddingTop: 0}
            }
        });
    }
})