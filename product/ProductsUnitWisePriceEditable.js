"use strict";
var React = require('react');
var Stream = require('streamjs');

var ProductsUnitWisePriceEditable;
module.exports = ProductsUnitWisePriceEditable = React.createClass({
    getDefaultProps: function () {
        var units = [];
        for (var i = 1; i < 10; i++) {
            units.push({id: i, name: 'Unit-' + i});
        }
        return {
            units: units,
            productsUnitWisePrice: [{unitId: 1, price: 154.12}, {unitId: 2, price: 204.74}, {unitId: 3, price: 420.24}],
            onChange: function onChange() {
            },
            onInit: function () {
            }
        };
    },
    componentDidMount: function () {
        var $this = this;
        if (!!$this.props.onInit) $this.props.onInit($this);
    },
    render: function () {
        var $this = this;
        var productsUnitWisePrice = $this.props.productsUnitWisePrice || [];
        var units = $this.props.units || [];

        var unitIndex = 1;
        return (

            <table className="table table-condensed">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    productsUnitWisePrice.map(function (unitWise) {
                        return (
                            <tr key={unitWise.id}>
                                <th>{unitIndex++}</th>
                                <td>
                                    <select className="form-control" value={unitWise.unitId}
                                            onChange={function (e) {$this.onUnitIdChange(e.target.value, unitWise)}}>
                                        <option value={0}>Select Unit</option>
                                        {
                                            units.map(function (u) {
                                                return (
                                                    <option key={u.id} value={u.id}>
                                                        {u.name}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </td>
                                <td>
                                    <input className="form-control" type="number" value={unitWise.price}
                                           onChange={function (e) {$this.onPriceChange(e.target.value, unitWise);}}/>
                                </td>
                                <td>
                                    <span className="btn btn-danger" onClick={function (e) {$this.remove(unitWise);}}>
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </span>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>

        );
    },
    remove: function (unit) {
        var $this = this;
        var newArray = $this.props.productsUnitWisePrice.filter(function (u) {
            return u !== unit;
        });
        $this.props.onChange(newArray, $this.props.productsUnitWisePrice, unit, "delete");
    },
    onUnitIdChange: function (unitId, unit) {
        var $this = this;
        unit.unitId = unitId;
        $this.props.onChange($this.props.productsUnitWisePrice, $this.props.productsUnitWisePrice, unit, "unitId", unitId);
    },
    onPriceChange: function (price, unit) {
        var $this = this;
        unit.price = price;
        $this.props.onChange($this.props.productsUnitWisePrice, $this.props.productsUnitWisePrice, unit, "price", price);
    },
    addMoreUnitWisePrice: function () {
        var $this = this;
        var unitWisePrice = $this.props.productsUnitWisePrice || [];

        var newId = Stream(unitWisePrice)
                .map(function (js) {
                    return js.id;
                })
                .max().orElse(0) + 1;

        var newUnit = {id: newId};
        unitWisePrice.push(newUnit);
        $this.props.onChange(unitWisePrice, $this.props.productsUnitWisePrice, newUnit, "new");
    }
});