"use strict";

import React from 'react';
var AuthorityList = require('./AuthorityList');

class ListAuthority extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorities: []
        };
    }

    render() {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    <AuthorityList authorities={this.state.authorities}/>

                </div>
            </div>
        );
    }
}

module.exports = ListAuthority;