"use strict";

var Globalize = require('./Globalize');

var App = require('./App');
var React = require('react');
var ReactDom = require('react-dom');
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
var ReactBootstrap = require('react-bootstrap')

var document = require('././document');

var UserApp = require('./user');
var ListUsers = require('./user/List');
var CreateUser = require('./user/Create');
var EditUser = require('./user/Edit');
var ViewUser = require('./user/View');

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
var ListInventory = require('./inventory/List');
var ViewInventory = require('./inventory/View');
var AddRemoveEditProducts = require('./inventory/AddRemoveEditProducts');

var LoginPage = require('./pages/Login');

var DashboardPage = require('./DashboardPage');

var TrackPage = require('./sell/SellTrackingSettings');

var Uris = require('./Uris');

//Create and initialize app when eventbus initialization complete.

document.addEventListener("EVENT_BUS_CONNECTED", function () {

    ReactDom.render(
        <Router history={hashHistory}>

            <Route path={Uris.LOGIN_URI} component={LoginPage}/>

            <Route path={Uris.BASE_URI} component={App}>

                <IndexRoute component={DashboardPage}/>

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
                    <Route path={Uris.INVENTORY.VIEW} component={ViewInventory}/>
                    <Route path={Uris.INVENTORY.ADD_REMOVE_EDIT_PRODUCTS} component={AddRemoveEditProducts}/>
                </Route>

                <Route path={Uris.SELL_INVENTORY_TRACK.CREATE} component={TrackPage}/>

            </Route>
        </Router>, document.getElementById('app'));
});

//Create the EventBus
window.ebb = require('././EventBus');
window.Events = require('./ServerEvents');