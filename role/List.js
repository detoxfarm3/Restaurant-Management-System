"use strict";

import React from 'react';
var RoleList = require('./RoleList');

class ListRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        };
    }

    render() {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    <RoleList roles={$this.state.roles}/>

                </div>
            </div>
        );
    }
}

module.exports = ListRole;