"use strict";

import React from 'react';
var SidebarToggleButton = require('./../SidebarToggleButton');

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var $this = this;

        return (

            <nav className="navbar navbar-default">
                <div className="container-fluid">

                    {$this.props.children}

                </div>
            </nav>

        );
    }
}

module.exports = Navbar;