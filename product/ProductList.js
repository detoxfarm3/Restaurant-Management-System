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
    formatAction: function (ac, product) {
        return (
            <div className="btn-group btn-group-sm">
                <span className="btn btn-primary">View</span>
                <span className="btn btn-warning">Edit</span>
            </div>
        );
    }
});