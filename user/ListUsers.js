"use strict";

var bt = require('react-bootstrap-table');

var BootstrapTable = bt.BootstrapTable;
var TableHeaderColumn = bt.TableHeaderColumn;

var React = require('react');

var EVENTS = require('./../Events');

var eb = require('../components/EventBus');

var lib = require('../components/functions');

var DataTypes = require('../DataTypes');

var Uris = require('../Uris');
var Config = require('../Config');

var ListUsers;

module.exports = ListUsers = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            data: [],
            headers: [],
            pagination: {}
        };
    },

    componentDidMount: function () {
        var $this = this;
        eb.send(EVENTS.FIND_ALL_USERS, {}, {}, function (e, msg) {
            if (!!e) {
                console.error(e);
                return;
            }
            if (!!msg.failureCode) {
                console.error(msg);
                return;
            }

            console.info(EVENTS.FIND_ALL_USERS + ": " + JSON.stringify(msg.body));
            $this.setState(msg.body || {});
        });
    },

    render: function () {
        var $this = this;
        var headers = $this.state.headers;

        if (!headers.length) {
            return <h5>No Data</h5>;
        }

        headers.forEach(function (header) {

            if (header.field == 'name') {

                header.dataFormat = function (str, obj) {
                    return <a href={lib.hashUri(Config.BASE_URI, Uris.VIEW_USER, obj)}>{str}</a>
                };

            } else if (header.dataType == DataTypes.DATE) {
                header.dataFormat = function (dateStr) {
                    var date = new Date(dateStr);
                    return lib.formatDate(date);
                };
            } else {
                header.dataFormat = function (s) {
                    return s;
                }
            }
        });

        var cnt = 1;
        return (
            <BootstrapTable data={$this.state.data} striped={true} hover={true} condensed={true}>
                {$this.state.headers.map(function (header) {
                    return (
                        <TableHeaderColumn key={cnt++} dataField={header.field}
                                           dataFormat={header.dataFormat}
                                           isKey={!!header.isKey}>{header.label}</TableHeaderColumn>
                    );
                })}
            </BootstrapTable>
        );
    }
});