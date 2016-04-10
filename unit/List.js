"use strict";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
var React = require('react');

var eb = require('.././EventBus');
var ServerEvents = require('../ServerEvents');

var NewUnitDialog = require('./NewUnitDialog');

var unitService = require('./UnitService');

var ee = require('../EventEmitter');
var Events = require('../Events');

var auth = require('../AuthService');

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
    componentDidMount: function () {
        var $this = this;

        $this.findAllUnits();

        ee.on(Events.UNIT_CREATED, $this.onUnitChanged);

        ee.on(Events.UNIT_UPDATED, $this.onUnitChanged);

        ee.on(Events.UNIT_DELETED, $this.onUnitChanged);
    },
    componentWillUnmount: function () {
        var $this = this;
        ee.removeListener(Events.UNIT_CREATED, $this.onUnitChanged);

        ee.removeListener(Events.UNIT_UPDATED, $this.onUnitChanged);

        ee.removeListener(Events.UNIT_DELETED, $this.onUnitChanged);
    },
    render: function () {
        var $this = this;
        var units = $this.state.units;

        var editable = auth.currentUser().username == "admin";
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
                                    {
                                        auth.currentUser().username != "admin" ? null : (
                                            <span className="btn btn-primary pull-right"
                                                  onClick={$this.createNewUnit}>New</span>
                                        )
                                    }
                                </div>
                            </div>

                        </div>

                        <BootstrapTable data={units} cellEdit={$this.cellEditProp()}>
                            <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="name" editable={editable}>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="fullName" editable={editable}>Full Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="remarks" editable={editable}>Remarks</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" editable={false}
                                               dataFormat={$this.formatAction}
                                               hidden={!editable}>Action</TableHeaderColumn>
                        </BootstrapTable>

                    </div>

                    <NewUnitDialog onInit={$this.onNewUnitDialogInit}/>

                </div>
            </div>
        );
    },
    onUnitChanged: function () {
        var $this = this;
        $this.findAllUnits();
    },
    findAllUnits: function (params) {
        var $this = this;
        unitService.findAllUnits(params)
            .then(function (rsp) {
                $this.setState({
                    units: rsp.data
                });
            })
        ;
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

        unitService.delete(unit.id);
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
        unitService.update(row);
    }
});