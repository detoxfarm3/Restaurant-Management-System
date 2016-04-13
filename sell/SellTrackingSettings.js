"use strict";
var React = require('react');

var productService = require('../product/ProductService');
var unitService = require('../unit/UnitService');
var inventoryServie = require('../inventory/InventoryService');

var Promise = require('bluebird');

var trkSv = require('./TrackService');

var SellApp;
module.exports = SellApp = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            tracks: [{no: 1}, {no: 2}],
            products: [],
            productsById: {},
            rawProducts: [],
            rawProductsById: {},
            units: [],
            unitsById: {},
            inventories: [],
            inventoriesById: {},
            productsUnitWisePrice: {},
            inventoryProducts: [],
            inventoryProductsByInventoryId: {},
            inventoryProductsByProductId: {},
            productId: null,
        };
    },
    componentDidMount: function () {
        var $this = this;

        var arr = [];

        arr.push(
            productService.findAllDecomposed({forSale: false})
                .then(rsp => {
                    rsp.data = rsp.data || [];
                    return {
                        rawProducts: rsp.data,
                        rawProductsById: rsp.data.reduce((map, prod) => {
                            map[prod.id] = prod;
                            return map;
                        }, {})
                    };
                }))
        ;

        arr.push(
            productService.findAllDecomposed({forSale: true})
                .then(rsp => {
                    rsp.data = rsp.data || [];
                    return {
                        products: rsp.data,
                        productsById: rsp.data.reduce((map, prod) => {
                            map[prod.id] = prod;
                            return map;
                        }, {})
                    };
                }))
        ;


        arr.push(
            unitService.findAllUnits()
                .then(rsp => {
                    rsp.data = rsp.data || [];
                    return {
                        units: rsp.data,
                        unitsById: rsp.data.reduce((map, prod) => {
                            map[prod.id] = prod;
                            return map;
                        }, {})
                    };
                }))
        ;


        arr.push(
            inventoryServie.findAllProducts()
                .then(rsp => {
                    rsp.data = rsp.data || [];
                    return {
                        inventoryProducts: rsp.data,
                        inventoryProductsByInventoryId: rsp.data.reduce((map, invProd) => {
                            map[invProd.inventoryId] = map[invProd.inventoryId] || [];
                            map[invProd.inventoryId].push(invProd);
                            return map;
                        }, {}),
                        inventoryProductsByProductId: rsp.data.reduce((map, invProd) => {
                            map[invProd.productId] = map[invProd.productId] || [];
                            map[invProd.productId].push(invProd);
                            return map;
                        }, {}),
                    };
                }))
        ;

        arr.push(productService.unitWisePrice()
            .then(prices => {
                return {
                    productsUnitWisePrice: prices
                };
            }))

        arr.push(
            inventoryServie.findAll()
                .then(rsp => {
                    rsp.data = rsp.data || [];
                    return {
                        inventories: rsp.data,
                        inventoriesById: rsp.data.reduce((map, inv) => {
                            map[inv.id] = inv;
                            return map;
                        }, {})
                    };
                }))
        ;

        Promise.all(arr)
            .then(list => {
                list = list || [];
                return list.reduce((map, state) => {
                    state = state || {};
                    for (var x in state) {
                        map[x] = state[x];
                    }
                    return map;
                }, {})
            })
            .then(state => $this.setState(state))
        ;

    },
    render: function () {
        var $this = this;

        return (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">

                        <div className="col-md-6">

                            <h3 className="panel-title">Sell Tracking Settings</h3>

                        </div>

                        <div className="col-md-2">
                            {

                                $this.products()
                            }
                        </div>

                        <div className="col-md-2">

                            <span className="btn btn-success pull-right" onClick={$this.addRow}>+</span>

                        </div>

                        <div className="col-md-2">

                            <span className="btn btn-primary pull-right" onClick={$this.create}>Create </span>

                        </div>

                    </div>
                </div>
                <div className="panel-body">

                    <table className="table table-striped">

                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Inventory Product</th>
                            <th>Inventory</th>
                            <th>Quantity</th>
                            <th>Selling Unit</th>
                            <th>Stock Unit</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            $this.state.tracks.map(prod => {

                                return (
                                    <tr key={prod.no}>

                                        <td>{($this.state.productsById[prod.id] || {}).name}</td>

                                        <td>
                                            {
                                                $this.rawProducts(prod)
                                            }
                                        </td>


                                        <td>

                                            {
                                                $this.inventory(prod)
                                            }

                                        </td>


                                        <td>
                                            <input className="form-control" name="quantity" value={prod.quantity}
                                                   onChange={e => $this.onProductChange(e, prod)}/>
                                        </td>
                                        <td>
                                            {
                                                $this.sellingUnit(prod)
                                            }
                                        </td>
                                        <td>
                                            {
                                                $this.buyingUnit(prod)
                                            }
                                        </td>
                                    </tr>
                                );

                            })
                        }

                        </tbody>

                    </table>

                </div>
            </div>

        );
    },

    addRow: function () {
        var $this = this;

        var tks = $this.state.tracks || [];

        tks.push({no: Math.random(), id: $this.state.productId});

        $this.setState($this.interceptTracks({tracks: tks}));
    },

    products: function () {
        var $this = this;
        return (
            <select className="form-control pull-right"
                    name="productId"
                    value={$this.state.productId}
                    onChange={$this.onProductIdChange}>

                <option value={0}>Select A Product</option>

                {
                    $this.state.products.map(pp => {

                        var id = pp.id;

                        return (
                            <option key={id} value={id}>{($this.state.productsById[id] || {}).name}</option>
                        );
                    })
                }

            </select>
        );
    },

    onProductIdChange: function (e) {
        var $this = this;

        var productId = e.target.value;

        $this.state.tracks.forEach(tk => tk.id = productId);

        $this.setState($this.interceptTracks({
            productId: productId,
            tracks: $this.state.tracks
        }));
    },

    inventory: function (prod) {
        var $this = this;
        return (
            <select className="form-control"
                    name="inventoryId" value={prod.inventoryId}
                    onChange={e => $this.onProductChange(e, prod)}>

                <option value={0}>Select Inventory</option>

                {
                    $this.state.inventories.map(inv => {
                        return (
                            <option key={inv.id} value={inv.id}>{inv.name}</option>
                        );
                    })
                }

            </select>
        );
    },

    sellingUnit: function (prod) {
        var $this = this;

        var unitWisePrice = $this.state.productsUnitWisePrice[prod.id] || {};

        return (
            <select className="form-control"
                    name="unitId" value={prod.unitId}
                    onChange={e => $this.onProductChange(e, prod)}>

                <option value={0}>Select Selling Unit</option>

                {
                    Object.keys(unitWisePrice).map(unitId => {

                        var unit = ($this.state.unitsById[unitId] || {});
                        return (
                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                        );
                    })
                }

            </select>
        );
    },

    buyUnit: function (prod) {

        var $this = this;

        var inventoryProductsByProductId = $this.state.inventoryProductsByProductId || {};

        var invProds = inventoryProductsByProductId[prod.inventoryProductId] || [];

        var invProd = invProds.filter(pcv => pcv.inventoryId == prod.inventoryId)[0] || {};

        var unitId = (invProd || {}).unitId;

        return ($this.state.unitsById[unitId] || {});
    },

    buyingUnit: function (prod) {
        var $this = this;

        return $this.buyUnit(prod).name;
    },

    rawProducts: function (prod) {
        var $this = this;

        var prods = $this.state.inventoryProductsByInventoryId[prod.inventoryId] || $this.state.rawProducts || [];

        prods = prods.filter(pd => !pd.forSale);

        var rawProdsById = $this.state.rawProductsById;

        return (
            <select className="form-control"
                    name="inventoryProductId" value={prod.inventoryProductId}
                    onChange={e => $this.onProductChange(e, prod)}>

                <option value={0}>Select Raw Product</option>

                {
                    prods.map(pp => {

                        var id = pp.productId || pp.id

                        return (
                            <option key={id} value={id}>{(rawProdsById[id] || {}).name}</option>
                        );
                    })
                }

            </select>
        );

    },

    onProductChange: function (e, prod) {
        var $this = this;
        prod[e.target.name] = e.target.value;
        $this.setState($this.interceptTracks({
            tracks: $this.state.tracks
        }));
    },

    interceptTracks: function (state, productsUnitWisePrice) {
        var $this = this;

        productsUnitWisePrice = state.productsUnitWisePrice || $this.state.productsUnitWisePrice;

        state.tracks = state.tracks || [];

        state.tracks.forEach(trk => {

            var unitWi = productsUnitWisePrice[trk.id] || {};

            var ks = Object.keys(unitWi);

            if (ks.length == 1) {
                trk.unitId = ks[0];
            }


            trk.inventoryUnitId = $this.buyUnit(trk).id;
        })

        return state;
    },

    create: function () {
        var $this = this;
        trkSv.create($this.state.tracks)
            .then(v => {
                alert("Created successfully");
                $this.setState({
                    tracks: [],
                    productId: null,
                });
            })
        ;
    }
});