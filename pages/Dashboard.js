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

        var total = 0;

        return (

            <div className="row">
                <div className="col-md-12">

                    <table className="table table-condensed">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th style={{textAlign: 'right'}}>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            $this.state.salesByDate.map((e) => {
                                total += parseFloat(e.totalSales);
                                return (
                                    <tr key={Math.random()}>
                                        <td>{lib.formatDate(e.date)}</td>
                                        <td style={{textAlign: 'right'}}>{e.totalSales.toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>Total</td>
                            <td style={{textAlign: 'right'}}>{total.toFixed(2)}</td>
                        </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        );
    }
}

module.exports = Dashboard;