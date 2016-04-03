"use strict";

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var Stream = require('streamjs');
var lib = require('../../components/functions');

class CreateSellByProductsGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;
        var sellUnitsByProductId = $this.props.sellUnitsByProductId;

        var products = $this.props.products;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice;
        var unitsById = $this.props.unitsById;

        var totalCounter = {quantity: 0, total: 0};
        var serial = 1;
        var sUnits = Stream(products)
                .map(function (product) {
                    return sellUnitsByProductId[product.id] || {
                            no: Math.random(1, 900000000),
                        };
                })
                .peek(function (unit) {
                    totalCounter.quantity = totalCounter.quantity + (parseInt(unit.quantity) || 0);
                    totalCounter.total = totalCounter.total + (parseInt(unit.total) || 0);
                })
                .map(function (unit) {
                    return lib.merge2(unit, {
                        serial: serial++,
                        productId: (
                            <select className="form-control" style={{width: '180px'}}
                                    name="productId" value={unit.productId}
                                    onChange={function (e) {
                                    $this.onChange(e, unit);
                                }}>

                                <option key={0} value="">Product</option>

                                {
                                    Object.keys(products || {}).map(function (productId) {
                                        var product = products[productId];
                                        return (<option key={product.id} value={product.id}>{product.name}</option>);
                                    })
                                }
                            </select>
                        ),
                        quantity: (
                            <input className="form-control" type="number" style={{width: '100px'}}
                                   name="quantity" value={unit.quantity}
                                   onChange={function (e) {
                                    $this.onChange(e, unit);
                               }}
                                />
                        ),
                        unitId: (
                            <select className="form-control" style={{width: '120px'}}
                                    name="unitId" value={unit.unitId}
                                    onChange={function (e) {
                                        $this.onChange(e, unit);
                                     }}>
                                <option key={0} value="">Unit</option>

                                {
                                    Object.keys(productsUnitWisePrice[unit.productId] || {}).map(function (unitId) {

                                        var unit = unitsById[unitId];
                                        return (<option key={unit.id} value={unit.id}>{unit.name}</option>);
                                    })
                                }

                            </select>
                        ),
                        unitPrice: (
                            <input className="form-control" type="number" style={{width: '120px'}}
                                   name="unitPrice" value={unit.unitPrice}
                                   onChange={function (e) {
                                    $this.onChange(e, unit);
                               }}
                                />
                        ),
                        total: (
                            <input className="form-control" type="number" style={{width: '120px'}}
                                   name="total" value={unit.total}
                                   onChange={function (e) {
                                    $this.onChange(e, unit);
                               }}
                                />
                        ),
                        action: (
                            <button className="btn btn-danger"
                                    onClick={function (e) {
                                    $this.deleteSellUnit(unit);
                                }}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                        )
                    });
                })
                .toArray()
            ;

        sUnits.push({
            productId: <strong>Total</strong>,
            quantity: <strong>{totalCounter.quantity}</strong>,
            total: <strong>{totalCounter.total}</strong>,
        });

        return (

            <BootstrapTable data={sUnits} striped={true} hover={true}>

                <TableHeaderColumn isKey={true} dataField="serial">#</TableHeaderColumn>

                <TableHeaderColumn dataField="productId">Product</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>

                <TableHeaderColumn dataField="unitId">Unit</TableHeaderColumn>
                <TableHeaderColumn dataField="unitPrice">Unit Price</TableHeaderColumn>

                <TableHeaderColumn dataField="total">Total</TableHeaderColumn>

                <TableHeaderColumn dataField="action">Action</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}

CreateSellByProductsGrid.defaultProps = {

    products: [
        {
            id: 1,
            name: 'Biriani'
        },
        {
            id: 2,
            name: 'Kaccchi'
        }
    ],
    unitsById: {
        1: {
            id: 1,
            name: 'Cup'
        }
        ,
        2: {
            id: 2,
            name: 'Peace'
        }
    },
    productsUnitWisePrice: {
        1: {
            1: 200,
            2: 500
        },
        2: {
            1: 10,
            2: 50
        }
    },
    sellUnitsByProductId: {
        1: {
            no: 1,
        }
        ,
        2: {
            no: 2,
        }
        ,
        3: {
            no: 3,
        }
        ,
        4: {
            no: 4,
        }
    },
    onChange: function (newSellUnits, prevSellUnits) {

    },
    onInit: function () {
    }
}

module.exports = CreateSellByProductsGrid;