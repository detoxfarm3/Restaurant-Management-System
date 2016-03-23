"use strict"
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var AuthoritiesListViewEmbed = require('./AuthoritiesListViewEmbed');

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.formatAction.bind(this);
        this.formatAuthorities.bind(this);
    }

    render() {
        var $this = this;
        var users = $this.props.users || [];

        var cellEditProp = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: $this.saveCell
        }

        return (
            <BootstrapTable data={users} striped={true} hover={true} cellEdit={cellEditProp}>

                <TableHeaderColumn isKey={true}
                                   dataField="id" hidden={true}>ID</TableHeaderColumn>

                <TableHeaderColumn dataField="userId">User ID</TableHeaderColumn>

                <TableHeaderColumn dataField="username">Username</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>

                <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
                <TableHeaderColumn dataField="authorities"
                                   dataFormat={$this.formatAuthorities}
                                   editable={false}>Authorities</TableHeaderColumn>

                <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
                <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>

                <TableHeaderColumn dataField="remarks" editable={false}
                                   dataFormat={$this.formatAction}>Action</TableHeaderColumn>

            </BootstrapTable>
        );
    }

    saveCell(row, name, value) {

    }

    formatAuthorities(authorities, user) {
        var $this = this;
        return (

            <AuthoritiesListViewEmbed authorities={authorities}/>
        );
    }

    formatAction(action, user) {
        var $this = this;
        return (
            <div>
                <span className="btn btn-success" style={{marginRight: '10px'}}>Edit Authorities</span>
                <span className="btn btn-danger">
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