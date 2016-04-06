"use strict";
import React from 'react'
var SingleProductViewShort = require('./SingleProductViewShort');
var ProductList = require('./ProductList');
var Uris = require('../Uris');
var productService = require('./ProductService');

var ListProduct;
module.exports = ListProduct = React.createClass({
    getInitialState: function () {
        return {
            products: [
                {
                    id: 1,
                    name: 'Janji',
                    manufacturerPrice: {amount: 5564, unit: {id: 45, name: 'Kg'}},
                    inventories: [
                        {
                            inventory: {id: 1, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        }
                    ],
                    price: [
                        {
                            id: 1, unit: {id: 1, name: 'U-1'}, amount: 512
                        },
                        {
                            id: 2,
                            unit: {id: 2, name: 'U-2'},
                            amount: 7552
                        },
                        {
                            id: 3,
                            unit: {id: 2, name: 'U-2'},
                            amount: 7552
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Janji',
                    manufacturerPrice: {amount: 5564, unit: {id: 45, name: 'Kg'}},
                    inventories: [
                        {
                            inventory: {id: 1, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 2, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 3, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 4, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 5, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        }
                    ],
                    price: [
                        {
                            id: 1, unit: {id: 1, name: 'U-1'}, amount: 512
                        },
                        {
                            id: 2,
                            unit: {id: 2, name: 'U-2'},
                            amount: 7552
                        },
                        {
                            id: 3,
                            unit: {id: 2, name: 'U-2'},
                            amount: 7552
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Janji',
                    manufacturerPrice: {amount: 5564, unit: {id: 45, name: 'Kg'}},
                    inventories: [
                        {
                            inventory: {id: 1, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 2, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        },
                        {
                            inventory: {id: 5, name: 'In-1'},
                            quantity: 545,
                            available: 545,
                            unit: {id: 1, name: 'Lg'}
                        }
                    ],
                    price: [
                        {
                            id: 1, unit: {id: 1, name: 'U-1'}, amount: 512
                        }
                    ]
                }
            ]
        };
    },
    componentDidMount: function () {
        var $this = this;
        productService.findAll()
            .then(rsp => {
                $this.setState({products: rsp.data});
            })
        ;

    },
    componentWillUnmount: function () {
        var $this = this;
    },
    render: function () {
        var $this = this;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">

                    <div className="row">

                        <div className="col-md-10">
                            <h3 className="panel-title">
                                All Products [ Total: {($this.state.products || []).length} ]</h3>
                        </div>

                        <div className="col-md-2">

                            <a className="btn btn-primary pull-right"
                               href={Uris.toAbsoluteUri(Uris.PRODUCT.CREATE)}>New Product</a>

                        </div>

                    </div>

                </div>

                <ProductList products={$this.state.products}/>
            </div>
        );
    }
});