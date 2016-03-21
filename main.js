"use strict";

var Globalize = require('./Globalize');

var App = require('./App');
var React = require('react');
var ReactDom = require('react-dom');
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
var ReactBootstrap = require('react-bootstrap')

var document = require('./components/document');

var UserApp = require('./user');
var ListUsers = require('./user/ListUsers');
var CreateUser = require('./user/CreateUser');
var EditUser = require('./user/EditUser');
var ViewUser = require('./user/ViewUser');

var SellApp = require('./sell');
var CreateSell = require('./sell/Create');
var ListSell = require('./sell/List');
var ViewSell = require('./sell/View');
var EditSell = require('./sell/Edit');

var ProductApp = require('./product');
var CreateProduct = require('./product/Create');
var ListProduct = require('./product/List');
var ViewProduct = require('./product/View');
var EditProduct = require('./product/Edit');

var UnitApp = require('./unit');
var ListUnit = require('./unit/List');

var InventoryApp = require('./inventory');
var CreateInventory = require('./inventory/Create');
var ListInventory = require('./inventory/List');
var ViewInventory = require('./inventory/View');
var EditInventory = require('./inventory/Edit');

var Uris = require('./Uris');

//Create and initialize app when eventbus initialization complete.

document.addEventListener("EVENT_BUS_CONNECTED", function () {

    ReactDom.render(
        <Router history={hashHistory}>
            <Route path={Uris.BASE_URI} component={App}>
                <IndexRoute component={ListUsers}/>

                <Route path={Uris.USER.BASE} component={UserApp}>
                    <IndexRoute component={ListUsers}/>
                    <Route path={Uris.USER.CREATE} component={CreateUser}/>
                    <Route path={Uris.USER.VIEW} component={ViewUser}/>
                    <Route path={Uris.USER.EDIT} component={EditUser}/>
                </Route>

                <Route path={Uris.SELL.BASE} component={SellApp}>
                    <IndexRoute component={ListSell}/>
                    <Route path={Uris.SELL.CREATE} component={CreateSell}/>
                    <Route path={Uris.SELL.VIEW} component={ViewSell}/>
                    <Route path={Uris.SELL.EDIT} component={EditSell}/>
                </Route>

                <Route path={Uris.PRODUCT.BASE} component={ProductApp}>
                    <IndexRoute component={ListProduct}/>
                    <Route path={Uris.PRODUCT.CREATE} component={CreateProduct}/>
                    <Route path={Uris.PRODUCT.VIEW} component={ViewProduct}/>
                    <Route path={Uris.PRODUCT.EDIT} component={EditProduct}/>
                </Route>

                <Route path={Uris.UNIT.BASE} component={UnitApp}>
                    <IndexRoute component={ListUnit}/>
                </Route>

                <Route path={Uris.INVENTORY.BASE} component={InventoryApp}>
                    <IndexRoute component={ListInventory}/>
                    <Route path={Uris.INVENTORY.CREATE} component={CreateInventory}/>
                    <Route path={Uris.INVENTORY.VIEW} component={ViewInventory}/>
                    <Route path={Uris.INVENTORY.EDIT} component={EditInventory}/>
                </Route>

            </Route>
        </Router>, document.getElementById('app'));
});

//Create the EventBus
require('./components/EventBus');