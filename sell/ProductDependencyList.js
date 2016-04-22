"use strict";
var Stream = require('streamjs');

import React from 'react';

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

            <table class="table table-condensed">
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
                        .filter(e => !!e.tracks.length)
                        .map(e => {
                            const {tracks, product} = e;
                            return (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>
                                        {
                                            tracks.map((tk, idx) => {
                                                return (
                                                    tk.name
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