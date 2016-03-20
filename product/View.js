"use strict";
import React from 'react'
var SingleProductViewShort = require('./SingleProductViewShort');

var ViewProduct;
module.exports = ViewProduct = React.createClass({
    getInitialState: function () {
        return {
            product: {}
        };
    },
    render: function () {
        var $this = this;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">

                    <div className="row">

                        <div className="col-md-11">
                            <h3 className="panel-title">Product Details</h3>
                        </div>

                        <div className="col-md-1">
                            <div className="btn-group btn-group-justified">

                                <span className="btn btn-primary"
                                      onClick={$this.createProduct}>Edit</span>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="panel-body" style={{paddingTop: '0'}}>
                    <SingleProductViewShort product={$this.state.product}/>
                </div>
            </div>
        );
    }
});