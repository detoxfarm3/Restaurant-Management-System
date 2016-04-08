"use strict";

import React from 'react';
import { Link } from 'react-router'
var Uris = require('../Uris');

class UserApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                           aria-haspopup="true" aria-expanded="false">Dropdown <span
                            className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );

        var $this = this;
    }
}

module.exports = UserApp;