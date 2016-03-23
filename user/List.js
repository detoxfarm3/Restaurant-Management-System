"use strict"
import React from 'react';
var UserList = require('./UserList');

class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    name: 'sohan',
                    userId: 'id-1',
                    authorities: [
                        {id: 1, name: 'seller'},
                        {id: 2, name: 'manager'},
                    ]
                },
                {
                    id: 2,
                    name: 'sohan',
                    userId: 'id-2',
                    authorities: [
                        {id: 1, name: 'seller'},
                        {id: 2, name: 'manager'},
                    ]
                },
                {
                    id: 3,
                    name: 'sohan',
                    userId: 'id-3',
                    authorities: [
                        {id: 1, name: 'seller'},
                        {id: 2, name: 'manager'},
                    ]
                },
            ]
        };
    }

    render() {
        var $this = this;
        var users = $this.state.users;

        return (

            <div className="row">
                <div className="col-md-12">

                    <UserList users={users}/>

                </div>
            </div>
        );
    }
}

module.exports = ListUser;