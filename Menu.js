"use strict";

import React from 'react';
import { IndexLink } from 'react-router';
var Uris = require('./Uris');

var auth = require('./AuthService');

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        return (

            <div className="list-group">

                {
                    auth.currentUser().username != "admin" ? null : (
                        <IndexLink to={Uris.PRODUCT.CREATE} activeClassName="active"
                                   className="list-group-item">Create Product</IndexLink>
                    )
                }

                <IndexLink to={Uris.PRODUCT.BASE} activeClassName="active"
                           className="list-group-item">View Products</IndexLink>

                <IndexLink to={Uris.SELL.CREATE} activeClassName="active"
                           className="list-group-item">Make Sale</IndexLink>

                <IndexLink to={Uris.parameterize(Uris.SELL.BASE, {tab: 1})} activeClassName="active"
                           className="list-group-item">View Sales</IndexLink>


                <IndexLink to={Uris.USER.BASE} activeClassName="active"
                           className="list-group-item">View Users</IndexLink>

                <IndexLink to={Uris.INVENTORY.BASE} activeClassName="active"
                           className="list-group-item">View Inventories</IndexLink>

                <IndexLink to={Uris.UNIT.BASE} activeClassName="active"
                           className="list-group-item">View Units</IndexLink>

            </div>

        );
    }
}

Menu.defaultProps = {
    onClick: null,
};

module.exports = Menu;