"use strict";
var React = require('react');

var UnitWisePrice;
module.exports = UnitWisePrice = React.createClass({
    getDefaultProps: function () {
        return {
            unitWisePrice: []
        };
    },
    render: function () {
        var $this = this;
        var unitWisePrice = $this.props.unitWisePrice || [];
        unitWisePrice = [
            {id: 1, unit: {id: 1, name: 'U-1'}, price: 512},
            {
                id: 2,
                unit: {id: 2, name: 'U-2'},
                price: 7552
            }];
        var unitIndex = 1;
        return (

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Unit</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {
                    unitWisePrice.map(function (unitWise) {
                        return (
                            <tr key={unitWise.id}>
                                <th>{unitIndex++}</th>
                                <th>{unitWise.unit.name}</th>
                                <th>{unitWise.price}</th>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>

        );
    }
});