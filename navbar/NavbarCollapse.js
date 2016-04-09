"use strict";

import React from 'react';
import { Link, browserHistory } from 'react-router'
var Uris = require('../Uris');
var authService = require('../AuthService');

class UserApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: authService.currentUser()
        };
    }

    render() {
        var $this = this;
        var user = $this.state.user || {};

        return (

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">

                    <li>
                        <Link to={Uris.parameterize(Uris.SELL.BASE, {tab: 1})}
                              activeClassName="active">Sales</Link>
                    </li>
                    <li>
                        <Link to={Uris.PRODUCT.BASE}
                              activeClassName="active">Products</Link>
                    </li>
                    <li>
                        <Link to={Uris.INVENTORY.BASE}
                              activeClassName="active">Inventories</Link>
                    </li>
                    <li>
                        <Link to={Uris.UNIT.BASE}
                              activeClassName="active">Units</Link>
                    </li>
                    <li>
                        <Link to={Uris.USER.BASE}
                              activeClassName="active">Users</Link>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">Create New <span
                            className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href={Uris.toAbsoluteUri(Uris.SELL.CREATE)}>Sell</a></li>
                            <li><a href={Uris.toAbsoluteUri(Uris.PRODUCT.CREATE)}>Product</a></li>
                            <li><a href={Uris.toAbsoluteUri(Uris.INVENTORY.BASE)}>Inventory</a></li>
                            <li><a href={Uris.toAbsoluteUri(Uris.USER.BASE)}>User</a></li>
                            <li><a href={Uris.toAbsoluteUri(Uris.UNIT.BASE)}>Unit</a></li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">{user.name} <span
                            className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a>Update Info</a></li>
                            <li role="separator" className="divider"></li>
                            <li onClick={$this.logout}><a >Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }

    logout() {
        console.log('logout');
        authService.logout()
            .then(() => location.href = Uris.toAbsoluteUri(Uris.LOGIN_URI));
    }
}

module.exports = UserApp;