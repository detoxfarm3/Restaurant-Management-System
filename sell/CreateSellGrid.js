"use strict";
import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var Stream = require('streamjs');
var lib = require('../../components/functions');

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var MyEvents = {
    PRODUCT_ID_CHANGED: "PRODUCT_ID_CHANGED",
    QUNATITY_CHANGED: "QUNATITY_CHANGED",
    UNIT_ID_CHANGED: "UNIT_ID_CHANGED",
    UNIT_PRICE_CHANGED: 'UNIT_PRICE_CHANGED',
}

var CreateSellGrid;
module.exports = CreateSellGrid = React.createClass({
    getDefaultProps: function () {
        return {
            productsById: {},
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
            sellUnitsByProductId: [
                {
                    no: 1,
                },
                {
                    no: 2,
                },
                {
                    no: 3,
                },
                {
                    no: 4,
                }
            ],
            onChange: function (newSellUnits, prevSellUnits) {

            },
            onInit: function () {
            }
        };
    },
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        var $this = this;

        $this.props.onInit($this);

        ee.on(MyEvents.PRODUCT_ID_CHANGED, function (unit) {
            if (!unit.productId) {
                unit.quantity = 0;
                unit.unitId = '';
            }
            $this.updateUnitPrice(unit);
            $this.props.onChange($this.props.sellUnitsByProductId, $this.props.sellUnitsByProductId, unit);
        });

        ee.on(MyEvents.UNIT_ID_CHANGED, function (unit) {
            $this.updateUnitPrice(unit);
        });

        ee.on(MyEvents.QUNATITY_CHANGED, function (unit) {
            $this.updateTotal(unit);
        });

        ee.on(MyEvents.UNIT_PRICE_CHANGED, function (unit) {
            $this.updateTotal(unit);
        });
    },
    componentWillUnmount: function () {
    },
    render: function () {
        var $this = this;
        var sellUnitsByProductId = $this.props.sellUnitsByProductId;

        var productsById = $this.props.productsById;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice;
        var unitsById = $this.props.unitsById;

        var totalCounter = {quantity: 0, total: 0};
        var serial = 1;
        var sUnits = Stream(Object.keys(productsById))
                .map(function (productId) {
                    return sellUnitsByProductId[productId] || {
                            no: Math.random(),
                            productId: productId
                        };
                })
                .peek(function (unit) {
                    totalCounter.quantity = totalCounter.quantity + (parseInt(unit.quantity) || 0);
                    totalCounter.total = totalCounter.total + (parseInt(unit.total) || 0);
                })
                .map(function (unit) {
                    return lib.merge2(unit, {
                        serial: serial++,
                        productId: (productsById[unit.productId] || {}).name,
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
                                    $this.crearUnit(unit);
                                }}>Clear</button>
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
    },
    clearAllUnits: function () {
        var $this = this;

        var sellUnitsByProductId = $this.props.sellUnitsByProductId;
        var map = {};

        Object.keys(sellUnitsByProductId).forEach(productId => {
            map[productId] = lib.merge2(sellUnitsByProductId[productId], {
                quantity: undefined,
                total: undefined,
            });
        });

        $this.props.onChange(map, sellUnitsByProductId);
    },
    crearUnit: function (unit) {
        var $this = this;
        var sellUnitsByProductId = $this.props.sellUnitsByProductId;

        unit.quantity = undefined;
        unit.total = undefined;

        $this.props.onChange(sellUnitsByProductId, $this.props.sellUnitsByProductId, unit);
    },
    updateUnitPrice: function (unit) {
        var $this = this;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice;

        unit.unitPrice = (productsUnitWisePrice[unit.productId] || {})[unit.unitId]
        $this.props.onChange($this.props.sellUnitsByProductId, $this.props.sellUnitsByProductId, unit);
        ee.emit(MyEvents.UNIT_PRICE_CHANGED, unit);
    },
    updateTotal: function (unit) {
        var $this = this;
        unit.total = unit.quantity * unit.unitPrice;
        $this.props.onChange($this.props.sellUnitsByProductId, $this.props.sellUnitsByProductId, unit);
    },
    addNew: function (sellUnit) {
        var $this = this;
        var sellUnitsByProductId = $this.props.sellUnitsByProductId;

        sellUnit = sellUnit || {};

        if (!!sellUnit.no && sellUnitsByProductId.findIndex(function (unit) {
                return sellUnit.no == unit.no;
            }) < 0) {
            sellUnit = $this.validateSaleUnit(sellUnit);


            sellUnitsByProductId.push(sellUnit);

            $this.props.onChange(sellUnitsByProductId, $this.props.sellUnitsByProductId, sellUnit);

            return sellUnit;
        }
        ;
        sellUnit.no = Math.random();

        sellUnitsByProductId.push($this.validateSaleUnit(sellUnit));

        $this.props.onChange(sellUnitsByProductId, $this.props.sellUnitsByProductId, sellUnit);

        return sellUnit;
    },
    validateSaleUnit: function (unit) {
        if (!unit.productId || unit.productId < 0) {
            unit.quantity = '';
            unit.unitId = '';
            unit.unitPrice = '';
            unit.total = '';
            return unit;
        } else {
            unit.unitPrice = unit.unitPrice || ($this.props.productsUnitWisePrice[unit.productId] || {})[unit.unitId];
            unit.total = unit.total || unit.quantity * unit.unitPrice;
            return unit;
        }
        return unit;
    },
    onChange: function (e, unit) {
        var $this = this;
        var target = e.target;
        var name = target.name;

        unit[name] = target.value;

        if (name == 'productId') {
            ee.emit(MyEvents.PRODUCT_ID_CHANGED, unit);
        } else if (name == 'unitId') {
            ee.emit(MyEvents.UNIT_ID_CHANGED, unit);
        } else if (name == 'quantity') {
            ee.emit(MyEvents.QUNATITY_CHANGED, unit);
        } else if (name == 'unitPrice') {
            ee.emit(MyEvents.UNIT_PRICE_CHANGED, unit);
        }

        $this.props.onChange($this.props.sellUnitsByProductId, $this.props.sellUnitsByProductId, unit);
    },
});