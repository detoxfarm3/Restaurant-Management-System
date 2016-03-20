"use strict";
import React from 'react'

var SingleProductViewShort;
module.exports = SingleProductViewShort = React.createClass({
    getDefaultProps: function () {
        return {
            product: {},
        };
    },
    render: function () {
        var $this = this;
        var product = $this.props.product;
        product.remarks = "REMRLALS";
        return (
            <table className="table table-condensed">
                <tbody>
                <tr>
                    <th>ID:</th>
                    <td colSpan="3">{product.id}</td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td>{product.name}</td>
                    <th>SKU:</th>
                    <td>{product.sku}</td>
                </tr>
                <tr>
                    <th>Price:</th>
                    <td>{product.price}</td>
                    <th>Manufacturer Price:</th>
                    <td>{product.manufacturerPrice}</td>
                </tr>
                <tr>
                    <th>Stock Quantity:</th>
                    <td>{product.stockQuantity}</td>
                    <th>Available:</th>
                    <td>{product.available}</td>
                </tr>
                {
                    !product.remarks ? null : (
                        <tr>
                            <th>Remarks:</th>
                            <td colSpan="3">{product.remarks}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        );
    }
})