"use strict";

import React from 'react';
var ProductDependencyList = require('./ProductDependencyList');

class ListTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            tracksByProductId: {},
            products: [],
            productsById: {},
        };
    }

    render() {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    <ProductDependencyList
                        tracksByProductId={$this.state.tracksByProductId}
                        productsById={$this.state.productsById}
                        products={$this.state.products}
                        />

                </div>
            </div>
        );
    }
}

module.exports = ListTrack;