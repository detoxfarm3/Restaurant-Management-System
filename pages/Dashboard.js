"use strict";

import React from 'react';
var lib = require('../../components/functions');
var $ = require('jquery');
var Apis = require('../Apis');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesByDate: [
                {date: new Date(), totalSales: 556566}
            ]
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var $this = this;
        $.ajax({
            url: Apis.SALES_BY_DATE,
            dataType: "json",
            success: function (rsp) {
                $this.setState({
                    salesByDate: rsp.data.map(rr => {
                        rr.date = new Date(rr.date);
                        return rr;
                    })
                });
            },
        })
    }

    render() {
        var $this = this;

        return (

            <div className="row">
                <div className="col-md-12">

                    <table className="table table-condensed">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            $this.state.salesByDate.map((e) => {
                                return (
                                    <tr key={Math.random()}>
                                        <td>{lib.formatDate(e.date)}</td>
                                        <td>{e.totalSales}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

module.exports = Dashboard;