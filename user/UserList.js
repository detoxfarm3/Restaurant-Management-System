"use strict"
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var AuthoritiesListViewEmbed = require('./AuthoritiesListViewEmbed');
var userService = require('./UserService');

var auth = require('../AuthService');

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.formatAction.bind(this);
        this.doDeleteUser.bind(this);
    }

    render() {
        var $this = this;
        var users = $this.props.users || [];

        var cellEditProp = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: $this.doUpdateUser
        }

        var editable = auth.currentUser().username == "admin";

        return (
            <BootstrapTable data={users} striped={true} hover={true} cellEdit={cellEditProp}>

                <TableHeaderColumn isKey={true}
                                   dataField="id" hidden={true}>ID</TableHeaderColumn>

                <TableHeaderColumn dataField="username" editable={editable}>Username</TableHeaderColumn>
                <TableHeaderColumn dataField="name" editable={editable}>Name</TableHeaderColumn>

                <TableHeaderColumn dataField="phone" editable={editable}>Phone</TableHeaderColumn>

                <TableHeaderColumn dataField="address" editable={editable}>Address</TableHeaderColumn>
                <TableHeaderColumn dataField="remarks" editable={editable}>Remarks</TableHeaderColumn>

                <TableHeaderColumn dataField="remarks" editable={false}
                                   dataFormat={$this.formatAction.bind($this)}
                    hidden={!editable}>Action</TableHeaderColumn>

            </BootstrapTable>
        );
    }

    doUpdateUser(user, name, value) {
        userService.update(user);
    }

    doDeleteUser(user) {
        userService.delete(user.id);
    }

    formatAction(action, user) {
        var $this = this;
        return (
            <div>
                <span className="btn btn-danger" onClick={function (e) {
                    $this.doDeleteUser(user);
                }}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </span>
            </div>
        );
    }
}

UserList.defaultProps = {
    users: []
};

module.exports = UserList;