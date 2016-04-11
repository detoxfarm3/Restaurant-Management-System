"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');
var ProductsInventoryView = require('./ProductsInventoryView');
var PriceView = require('./PriceView');
var PricePerUnit = require('./PricePerUnit');
var Uris = require('../Uris');

var authService = require('../AuthService');

var ProductList;
module.exports = ProductList = React.createClass({
    getDefaultProps: function () {
        return {products: []};
    },
    componentDidMount: function () {
        var $this = this;
    },
    render: function () {
        var $this = this;
        var products = $this.props.products;
        var currentUser = authService.currentUser();
        return (

            <div className="row">
                <div className="col-md-12">

                    <BootstrapTable data={products} striped={true} hover={true}>
                        <TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="prices"
                                           dataFormat={$this.formatPrice}>Price</TableHeaderColumn>
                        <TableHeaderColumn hidden={currentUser.username != "admin"} dataField="manufacturerPrice"
                                           dataFormat={$this.formatManufacturerPrice}>
                            Manufacturer Price</TableHeaderColumn>

                        <TableHeaderColumn dataField="forSale"
                                           dataFormat={forSale => !!forSale ? 'Yes' : 'No'}>
                            For Sale</TableHeaderColumn>

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
    formatPrice: function (prices) {
        prices = prices || [];

        return (
            <PriceView prices={prices}/>
        );
    },
    formatAction: function (ac, product) {
        return (
            <div className="">
                <a href={Uris.toAbsoluteUri(Uris.PRODUCT.VIEW, {id: product.id})} className="btn btn-sm btn-primary">View</a>
                {
                    authService.currentUser().username != "admin" ? null : (
                        <a href={Uris.toAbsoluteUri(Uris.PRODUCT.EDIT, {id: product.id})}
                           className="btn btn-sm btn-warning">Edit</a>
                    )
                }
            </div>
        );
    }
});