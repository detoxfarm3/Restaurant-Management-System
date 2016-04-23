"use strict";
var Stream = require('streamjs');

import React from 'react';
var Uris = require('../Uris');

class ProductDependencyList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;
        var tracksByProductId = $this.props.tracksByProductId;
        var productsById = $this.props.productsById;
        var products = $this.props.products;
        return (

            <table className="table table-condensed">
                <thead>
                <tr>
                    <th>
                        Product
                    </th>
                    <th>
                        Dependencies
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    Stream(products)
                        .map(p => {
                            return {
                                tracks: tracksByProductId[p.id] || [],
                                product: productsById[p.id] || {}
                            };
                        })
                        .peek(p => console.log("product", p.name))
                        .filter(e => !!e.tracks.length)
                        .map(e => {
                            const {tracks, product} = e;
                            return (
                                <tr key={Math.random()}>
                                    <td>
                                        <a href={Uris.toAbsoluteUri(Uris.SELL_INVENTORY_TRACK.UPDATE, {productId: product.id})}>{product.name}</a>
                                    </td>
                                    <td>
                                        {
                                            tracks.map((tk, idx) => {
                                                return (
                                                    <span key={Math.random()}>
                                                        {productsById[tk.inventoryProductId].name + ((idx === (tracks.length - 1)) ? '' : ', ')}
                                                    </span>
                                                );
                                            })
                                        }
                                    </td>
                                </tr>
                            );
                        })
                        .toArray()
                }
                </tbody>
            </table>

        );
    }
}

ProductDependencyList.defaultProps = {
    tracksByProductId: {},
    productsById: {},
    products: []
};

module.exports = ProductDependencyList;