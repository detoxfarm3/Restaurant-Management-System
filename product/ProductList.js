"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');

var ProductList;
module.exports = ProductList = React.createClass({
    getDefaultProps: function () {
        return {products: []};
    },
    render: function () {
        var $this = this;
        var products = $this.props.products;
        products = [{id: 1}, {id: 2}];
        return (

            <div className="row">
                <div className="col-md-12">

                    <BootstrapTable data={products} striped={true} hover={true}>
                        <TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="price">Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="unitWisePrice" dataFormat={$this.formatUnitWisePrice}>
                            Unit Wise Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="manufacturerPrice">Manufacturer Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="stockQuantity">Stock Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="available">Available</TableHeaderColumn>
                        <TableHeaderColumn dataField="sku">SKU</TableHeaderColumn>
                        <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" dataFormat={$this.formatAction}>Action</TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </div>
        );
    },
    formatUnitWisePrice: function (unitWisePrice) {
        unitWisePrice = unitWisePrice || [];

        unitWisePrice = [
            {id: 1, unit: {id: 1, name: 'U-1'}, price: 512},
            {
                id: 2,
                unit: {id: 2, name: 'U-2'},
                price: 7552
            }];

        return (
            <table className="table table-condensed" style={{margin: 0}}>
                <tbody>
                {
                    unitWisePrice.map(function (uw) {
                        return (
                            <tr key={uw.id}>
                                <th>{(uw.unit || {}).name}</th>
                                <td>{uw.price}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    },
    formatAction: function (ac, product) {
        return (
            <div className="btn-group btn-group-sm">
                <span className="btn btn-primary">View</span>
                <span className="btn btn-warning">Edit</span>
            </div>
        );
    }
});