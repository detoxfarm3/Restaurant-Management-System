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

        product = {
            id: 1,
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
        };

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
                    <td colSpan="3" style={{padding: 0}}>

                        <PriceView price={product.price}/>

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