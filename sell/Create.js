"use strict";
import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
var Stream = require('streamjs');
var lib = require('../components/functions');

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var Modal = require('../components/Modal');

var MyEvents = {
    PRODUCT_ID_CHANGED: "PRODUCT_ID_CHANGED",
    QUNATITY_CHANGED: "QUNATITY_CHANGED",
    UNIT_ID_CHANGED: "UNIT_ID_CHANGED",
    UNIT_PRICE_CHANGED: 'UNIT_PRICE_CHANGED',
    SUBMIT_SUCCESSFULL: 'SUBMIT_SUCCESSFULL',
    SUBMIT_FAILED: 'SUBMIT_FAILED'
}

var CreateSell;
module.exports = CreateSell = React.createClass({
    getDefaultProps: function () {
        return {
            products: {
                1: {
                    id: 1,
                    name: 'Biriani'
                },
                2: {
                    id: 2,
                    name: 'Kaccchi'
                }
            },
            units: {
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
            }
        };
    },
    getInitialState: function () {
        return {
            sell: {
                sellUnits: [
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
                ]
            },
            modal: {
                body: '',
                footer: '',
                title: '',
                isOpen: false,
            },
            ssq: false,
        };
    },
    componentWillMount: function () {
        var $this = this;

        ee.on(MyEvents.PRODUCT_ID_CHANGED, function (unit) {
            if (!unit.productId) {
                unit.quantity = 0;
                unit.unitId = '';
            }
            $this.updateUnitPrice(unit);
            $this.setState({ssq: !$this.state.ssq});
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
        ee.on(MyEvents.SUBMIT_SUCCESSFULL, function (sell) {
            $this.showOrderSuccess(sell);
            $this.clear($this.addNew);
        });
    },
    componentWillUnmount: function () {
    },
    render: function () {
        var $this = this;
        var sell = $this.state.sell;
        var sellUnits = sell.sellUnits;
        var products = $this.props.products;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice;

        var units = $this.props.units;

        var modal = $this.state.modal;

        var totalCounter = {quantity: 0, total: 0};
        var serial = 1;
        sellUnits = Stream(sellUnits)
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

                                    var unit = units[unitId];
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

        sellUnits.push({
            productId: <strong>Total</strong>,
            quantity: <strong>{totalCounter.quantity}</strong>,
            total: <strong>{totalCounter.total}</strong>,
        });

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Create And Bill Order</h3>
                </div>

                <button className="btn btn-primary"
                        style={{padding: '7px', width: '100px', margin: '2px', marginBottom: '5px', marginRight: '5px'}}
                        onClick={function () {$this.addNew();}}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>

                <button className="btn btn-success"
                        style={{padding: '7px', width: '100px', margin: '2px', marginBottom: '5px', fontWeight: 'bold', fontSize: '15px'}}
                        onClick={function () {$this.submit(sell);}}>
                    Submit
                </button>

                <BootstrapTable data={sellUnits} striped={true} hover={true}>

                    <TableHeaderColumn isKey={true} dataField="serial">#</TableHeaderColumn>

                    <TableHeaderColumn dataField="productId">Product</TableHeaderColumn>
                    <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>

                    <TableHeaderColumn dataField="unitId">Unit</TableHeaderColumn>
                    <TableHeaderColumn dataField="unitPrice">Unit Price</TableHeaderColumn>

                    <TableHeaderColumn dataField="total">Total</TableHeaderColumn>

                    <TableHeaderColumn dataField="action">Action</TableHeaderColumn>

                </BootstrapTable>


                <Modal title={modal.title} body={modal.body}
                       footer={modal.footer || $this.defaultModalFooter(modal)}
                       isOpen={modal.isOpen} onClose={modal.onClose}/>
            </div>
        );
    },
    clear: function (callback) {
        var $this = this;
        $this.setState({
            sell: {
                sellUnits: []
            }
        }, callback);
    },
    submit: function (sell) {
        var $this = this;
        console.log(sell);

        ee.emit(MyEvents.SUBMIT_SUCCESSFULL, sell);
    },
    deleteSellUnit: function (unit) {
        var $this = this;
        var sellUnits = $this.state.sell.sellUnits;
        var index = sellUnits.indexOf(unit);
        if (index > -1) {
            sellUnits.splice(index, 1);
            $this.setState({
                ssq: !$this.state.ssq
            });
        }
    },
    updateUnitPrice: function (unit) {
        var $this = this;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice;

        //if (unit.productId > -1 && unit.unitId > -1) {
        unit.unitPrice = (productsUnitWisePrice[unit.productId] || {})[unit.unitId]
        $this.setState({
            ssq: !$this.state.ssq
        });
        ee.emit(MyEvents.UNIT_PRICE_CHANGED, unit);
        //}
    },
    updateTotal: function (unit) {
        var $this = this;
        //if (unit.quantity > -1 && unit.unitPrice > -1) {
        unit.total = unit.quantity * unit.unitPrice;
        $this.setState({ssq: !$this.state.ssq});
        //}
    },
    addNew: function (sellUnit) {
        var $this = this;
        var sellUnits = $this.state.sell.sellUnits;

        sellUnit = sellUnit || {};

        if (!!sellUnit.no && sellUnits.findIndex(function (unit) {
                return sellUnit.no == unit.no;
            }) < 0) {
            sellUnit = $this.validateSaleUnit(sellUnit);


            sellUnits.push(sellUnit);

            $this.setState({
                ssq: !$this.state.ssq
            });

            return sellUnit;
        }

        var newNo = Stream(sellUnits)
                    .map(function (js) {
                        return js.no;
                    })
                    .max().orElse(0) + 1
            ;
        sellUnit.no = newNo;

        sellUnits.push($this.validateSaleUnit(sellUnit));

        $this.setState({
            ssq: !$this.state.ssq
        });

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

        $this.setState({ssq: !$this.state.ssq});
    },
    defaultModalFooter: function (modal) {
        return (
            <button className="btn btn-primary btn-lg" style={{fontWeight: 'bold'}}
                    onClick={modal.onClose}>Ok</button>
        );
    },
    onSubmitFailed: function (e) {

    },
    showOrderSuccess: function (sell) {
        var $this = this;
        var sellUnits = sell.sellUnits;
        sell.orderId = 1;

        var totalCounter = {quantity: 0, total: 0};
        var serial = 1;
        sellUnits = Stream(sellUnits)
            .peek(function (unit) {
                totalCounter.quantity = totalCounter.quantity + (parseInt(unit.quantity) || 0);
                totalCounter.total = totalCounter.total + (parseInt(unit.total) || 0);
            })
            .map(function (unit) {
                return lib.merge2(unit, {
                    serial: serial++,
                    productId: ($this.props.products[unit.productId] || {}).name,
                    unitId: ($this.props.units[unit.unitId] || {}).name
                });
            })
            .toArray()
        ;

        sellUnits.push({
            productId: <strong>Total</strong>,
            quantity: <strong>{totalCounter.quantity}</strong>,
            total: <strong>{totalCounter.total}</strong>,
        });


        $this.setState({
            modal: {
                title: (
                    <h4 className="modal-title text-primary" id="myModalLabel">
                        Order Successfull. Order ID: <strong
                        style={{fontWeight: 'bold', fontSize: '20px'}}> {sell.orderId} </strong></h4>
                ),
                body: (
                    <div className="row">
                        <div className="col-md-12">

                            <BootstrapTable data={sellUnits} striped={true} hover={true}>

                                <TableHeaderColumn isKey={true} dataField="serial">#</TableHeaderColumn>

                                <TableHeaderColumn dataField="productId">Product</TableHeaderColumn>
                                <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>

                                <TableHeaderColumn dataField="unitId">Unit</TableHeaderColumn>
                                <TableHeaderColumn dataField="unitPrice">Unit Price</TableHeaderColumn>

                                <TableHeaderColumn dataField="total">Total</TableHeaderColumn>

                            </BootstrapTable>

                        </div>
                    </div>
                ),
                isOpen: true,
                onClose: function () {
                    $this.setState({modal: {isOpen: false}});
                }
            }
        });
    }
})