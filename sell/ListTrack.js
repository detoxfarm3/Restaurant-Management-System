"use strict";

import React from 'react';
var ProductDependencyList = require('./ProductDependencyList');
var trkSv = require('./TrackService');
var productService = require('../product/ProductService');
var Promise = require('bluebird');

class ListTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            tracksByProductId: {},
            products: [],
            productsById: {},
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var $this = this;

        var arr = [];

        arr.push(
            trkSv.findAll()
                .then(rsp => {
                    return {
                        tracks: rsp.data,
                        tracksByProductId: rsp.data
                            .reduce((map, track) => {

                                var kk = map[track.productId] || [];

                                kk.push(track);

                                map[track.productId] = kk;

                                return map;
                            }, {})
                    };
                }))
        ;

        arr.push(
            productService.findAllDecomposed()
                .then(rsp => {
                    return {
                        products: rsp.data,
                        productsById: rsp.data.reduce((map, product) => {
                            map[product.id] = product;
                            return map;
                        }, {})
                    };
                })
        )

        Promise.all(arr)
            .then(states => {
                return states.reduce((map, state) => {
                    for (var x in state) {
                        map[x] = state[x];
                    }
                    return map;
                }, {});
            })
            .then(state => $this.setState(state))
        ;
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