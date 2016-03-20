"use strict";
import React from 'react'
var SingleProductViewShort = require('./SingleProductViewShort');

var ListProduct;
module.exports = ListProduct = React.createClass({
    getInitialState: function () {
        return {
            products: []
        };
    },
    render: function () {
        var $this = this;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">

                    <div className="row">

                        <div className="col-md-11">
                            <h3 className="panel-title">All Products</h3>
                        </div>

                    </div>

                </div>

                <div className="panel-body" style={{paddingTop: '0'}}>
                    <ProductList products={$this.state.products}/>
                </div>
            </div>
        );
    }
});