"use strict";

var App = require('./App');
var ReactDom = require('react-dom');
var document = require('./components/document');

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

var ListUsers = require('./user/ListUsers');
var CreateUser = require('./user/CreateUser');
var EditUser = require('./user/EditUser');
var ViewUser = require('./user/ViewUser');

var CreateProduct = require('./product/Create');

var SellApp = require('./sell');
var CreateSell = require('./sell/Create');
var ListSell = require('./sell/List');
var ViewSell = require('./sell/View');
var EditSell = require('./sell/Edit');

var Uris = require('./Uris');
var Config = require('./Config');

//Create and initialize app when eventbus initialization complete.

document.addEventListener("EVENT_BUS_CONNECTED", function () {

    ReactDom.render(
        <Router history={hashHistory}>
            <Route path={Config.BASE_URI} component={App}>
                <IndexRoute component={ListUsers}/>
                <Route path={Uris.CREATE_USER} component={CreateUser}/>
                <Route path={Uris.EDIT_USER} component={EditUser}/>
                <Route path={Uris.VIEW_USER} component={ViewUser}/>
                <Route path={Uris.CREATE_PRODUCT} component={CreateProduct}/>

                <Route path={Uris.SELL.BASE} component={SellApp}>
                    <IndexRoute component={ListSell}/>
                    <Route path={Uris.SELL.CREATE} component={CreateSell}/>
                    <Route path={Uris.SELL.VIEW} component={ViewSell}/>
                    <Route path={Uris.SELL.EDIT} component={EditSell}/>
                </Route>

            </Route>
        </Router>, document.getElementById('app'));
});

//Create the EventBus
require('./components/EventBus');