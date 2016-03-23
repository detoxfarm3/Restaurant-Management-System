"use strict";

import React from 'react';

class AuthorityList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        var authorities = this.props.authorities || [];

        var cellEditProp = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: saveCell
        }

        return (

            <BootstrapTable data={authorities} cellEdit={cellEditProp}>
                <TableHeaderColumn dataField="id" isKey={true} hidden={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                <TableHeaderColumn dataField="fullName">Full Name</TableHeaderColumn>
                <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>
                <TableHeaderColumn dataField="action" editable={false}
                                   dataFormat={this.formatAction}>Action</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    saveCell(row, cellName, cellValue) {

    }

    formatAction(action, role) {
        return (
            <span className="btn btn-danger">
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </span>
        );
    }
}

AuthorityList.defaultProps = {
    authorities: []
};

module.exports = AuthorityList;