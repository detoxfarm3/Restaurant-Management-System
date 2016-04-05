"use strict";
import React from 'react'
var SingleProductViewShort = require('./SingleProductViewShort');
var ProductsUnitWisePrice = require('./ProductsUnitWisePrice');

var productService = require('./ProductService');

var Uris = require('../Uris');

var ViewProduct;
module.exports = ViewProduct = React.createClass({
    getDefaultProps: function () {
        return {
            id: 0
        };
    },
    getInitialState: function () {
        return {
            product: {}
        };
    },
    componentDidMount: function () {
        var $this = this;

        if (!!$this.props.params.id) {
            productService.find($this.props.params.id)
                .then(product => {
                    console.log("PRODUCT_VIEW: ", product);
                    $this.setState({product: product});
                });
        }
    },
    componentWillUnmount: function () {
    },
    render: function () {
        var $this = this;
        var id = $this.props.params.id;
        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="row">

                                <div className="col-md-11">
                                    <h3 className="panel-title">Product Details</h3>
                                </div>

                                <div className="col-md-1">
                                    <div className="btn-group btn-group-justified">

                                        <a href={Uris.toAbsoluteUri(Uris.PRODUCT.EDIT, {id: id})}
                                           className="btn btn-primary"
                                           onClick={$this.createProduct}>Edit</a>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="panel-body" style={{paddingTop: '0'}}>
                            <SingleProductViewShort product={$this.state.product}/>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
});