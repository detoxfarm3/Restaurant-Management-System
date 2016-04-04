"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');
var ProductsInventoryView = require('./ProductsInventoryView');
var PriceView = require('./PriceView');
var PricePerUnit = require('./PricePerUnit');

var ProductList;
module.exports = ProductList = React.createClass({
    getDefaultProps: function () {
        return {products: []};
    },
    render: function () {
        var $this = this;
        var products = $this.props.products;
        return (

            <div className="row">
                <div className="col-md-12">

                    <BootstrapTable data={products} striped={true} hover={true}>
                        <TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="price"
                                           dataFormat={$this.formatPrice}>Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="manufacturerPrice" dataFormat={$this.formatManufacturerPrice}>Manufacturer
                            Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="inventories" dataFormat={$this.formatInventories}>
                            Inventory</TableHeaderColumn>
                        <TableHeaderColumn dataField="sku">SKU</TableHeaderColumn>
                        <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" dataFormat={$this.formatAction}>Action</TableHeaderColumn>
                    </BootstrapTable>

                </div>
            </div>
        );
    },
    formatInventories: function (inventories) {
        return (
            <ProductsInventoryView inventories={inventories}/>
        );
    },
    formatManufacturerPrice: function (manufacturerPrice) {

        return (
            <PricePerUnit price={manufacturerPrice.amount} unit={(manufacturerPrice.unit || {}).name}/>
        );
    },
    formatInventory: function (inventory) {
        return (inventory || {}).name;
    },
    formatPrice: function (price) {
        price = price || [];

        return (
            <PriceView prices={price}/>
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