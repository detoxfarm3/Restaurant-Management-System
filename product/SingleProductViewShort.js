"use strict";
import React from 'react'
var PriceView = require('./PriceView');
var PricePerUnit = require('./PricePerUnit');
var ProductStockViewEmbed = require('./ProductStockViewEmbed');
var ProductsInventoryView = require('./ProductsInventoryView');

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
                    <td colSpan="3" style={{padding: 0}}>

                        <PriceView prices={product.prices}/>

                    </td>
                </tr>
                <tr>
                    <th>Manufacturer Price:</th>
                    <td colSpan="3">
                        <PricePerUnit
                            price={(product.manufacturerPrice || {}).amount}
                            unit={((product.manufacturerPrice || {}).unit || {}).name}/>
                    </td>
                </tr>
                {
                    (!product.inventories || !product.inventories.length) ? null : (
                        <tr>
                            <th>Inventory:</th>
                            <td colSpan="3">
                                <ProductsInventoryView inventories={product.inventories}/>
                            </td>
                        </tr>
                    )
                }
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