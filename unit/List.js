"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');

var NewUnitDialog = require('./NewUnitDialog');

var ListUnits;
module.exports = ListUnits = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            units: [
                {id: '1', name: 's', remarks: 'rr'},
                {id: '2', name: 's', remarks: 'rr'},
                {id: '3', name: 's', remarks: 'rr'},
                {id: '4', name: 's', remarks: 'rr'},
            ]
        };
    },
    render: function () {
        var $this = this;
        var units = $this.state.units;
        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">

                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="panel-title">Panel title</h3>
                                </div>
                                <div className="col-md-4">
                                    <span className="btn btn-primary pull-right"
                                          onClick={$this.createNewUnit}>New</span>
                                </div>
                            </div>

                        </div>

                        <BootstrapTable data={units} cellEdit={$this.cellEditProp()}>
                            <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="remarks">Remarks</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" editable={false}
                                               dataFormat={$this.formatAction}>Action</TableHeaderColumn>
                        </BootstrapTable>

                    </div>

                    <NewUnitDialog onInit={$this.onNewUnitDialogInit}/>

                </div>
            </div>
        );
    },
    onNewUnitDialogInit: function (ref) {
        this.newUnitDialog = ref;
    },
    createNewUnit: function () {
        var $this = this;
        $this.newUnitDialog.createNewUnit();
    },
    formatAction: function (ac, unit) {
        var $this = this;
        return (
            <span className="btn btn-danger"
                  onClick={function () {
                        $this.deleteUnit(unit);
                  }}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </span>
        );
    },
    deleteUnit: function (unit) {
        var $this = this;
        $this.setState({
            units: $this.state.units.filter(function (u) {
                return u != unit;
            })
        });
    },
    cellEditProp: function () {
        var $this = this;
        return {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: $this.onAfterSaveCell
        };
    },
    onAfterSaveCell: function (row, cellName, cellValue) {
        var $this = this;
    }
});