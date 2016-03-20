"use strict";
var React = require('react');
var CreateSellGrid = require('./CreateSellGrid');
var Modal = require('../components/Modal');
var SellPreview = require('./SellPreview');
var EditableSellHeader = require('./EditableSellHeader');

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var Events = {
    SUBMIT_REQUESTED: 'SUBMIT_REQUESTED',
    SUBMIT_SUCCESSFULL: 'SUBMIT_SUCCESSFULL',
    SUBMIT_FAILED: 'SUBMIT_FAILED'
};

var EditSell;
module.exports = EditSell = React.createClass({
    getInitialState: function () {
        return {
            products: {
                1: {
                    id: 1,
                    name: 'Biriani'
                },
                2: {
                    id: 2,
                    name: 'Kaccchi'
                }
            },
            units: {
                1: {
                    id: 1,
                    name: 'Cup'
                }
                ,
                2: {
                    id: 2,
                    name: 'Peace'
                }
            },
            productsUnitWisePrice: {
                1: {
                    1: 200,
                    2: 500
                },
                2: {
                    1: 10,
                    2: 50
                }
            },
            sell: {
                sellUnits: [
                    {
                        no: 1,
                    },
                    {
                        no: 2,
                    },
                    {
                        no: 3,
                    },
                    {
                        no: 4,
                    }
                ]
            },
            modal: {
                body: '',
                footer: '',
                title: '',
                isOpen: false,
            },
            ssq: false,
        };
    },
    componentDidMount: function () {
        var $this = this;
        ee.on(Events.SUBMIT_REQUESTED, function (sell) {
            console.log(sell);
            ee.emit(Events.SUBMIT_SUCCESSFULL);
        });

        ee.on(Events.SUBMIT_SUCCESSFULL, function (sell) {
            $this.showOrderSuccess(sell || {sellUnits: []});
        });

        ee.on(Events.SUBMIT_FAILED, function (e) {

        });
    },
    componentWillUnmount: function () {
        ee.removeAllListeners();
    },
    render: function () {
        var $this = this;
        var modal = $this.state.modal;
        var sell = $this.state.sell;

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="panel-title" style={{lineHeight: '28px', fontSize: '20px'}}>
                                        Order General
                                    </h3>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-primary btn-block pull-right"
                                            style={{fontWeight: 'bold'}}
                                            onClick={function () {$this.submit(sell);}}>
                                        Update
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">

                            <EditableSellHeader sell={sell}/>

                        </div>
                    </div>

                    <div className="panel panel-default">

                        <button className="btn btn-primary"
                                style={{padding: '7px', width: '100px', margin: '2px', marginBottom: '5px', marginRight: '5px'}}
                                onClick={function () {$this.addNew();}}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>

                        <CreateSellGrid units={$this.props.units} products={$this.props.products}
                                        productsUnitWisePrice={$this.props.productsUnitWisePrice}
                                        sellUnits={sell.sellUnits}
                                        onChange={$this.onSaleUnitsChange} onInit={$this.onCreateSellGridInit}/>

                        <Modal title={modal.title} body={modal.body}
                               footer={modal.footer || $this.defaultModalFooter(modal)}
                               isOpen={modal.isOpen} onClose={modal.onClose}/>
                    </div>


                    <div className="panel panel-default">

                        <div className="panel-body">

                            <form className="form-horizontal">
                                <div className="form-group">

                                    <label htmlFor="remarks" className="col-sm-2 control-label"
                                           style={{textAlign: 'left'}}>Remarks:</label>

                                    <div className="col-sm-10">
                                        <textarea className="form-control" rows="3" placeholder="Remarks"></textarea>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        );
    },
    onCreateSellGridInit: function (createSellGrid) {
        this.createSellGrid = createSellGrid;
    },
    onSaleUnitsChange: function (newSellUnits, prevSellUnits, unit) {
        var $this = this;
        $this.setState({
            sell: {
                sellUnits: newSellUnits
            }
        });
    },
    addNew: function () {
        var $this = this;
        $this.createSellGrid.addNew();
    },
    submit: function (sell) {
        var $this = this;
        ee.emit(Events.SUBMIT_REQUESTED, sell);
    },
    onSubmitFailed: function (e) {

    },
    showOrderSuccess: function (sell) {
        var $this = this;
        var sellUnits = sell.sellUnits || [];

        $this.setState({
            modal: {
                title: (
                    <h4 className="modal-title text-primary" id="myModalLabel">
                        Order updated successfully. Order ID: <strong
                        style={{fontWeight: 'bold', fontSize: '20px'}}> {sell.orderId} </strong></h4>
                ),
                body: (
                    <SellPreview sell={sell}/>
                ),
                isOpen: true,
                onClose: function () {
                    $this.setState({modal: {isOpen: false}});
                }
            }
        });
    },
    defaultModalFooter: function (modal) {
        return (
            <button className="btn btn-primary btn-lg" style={{fontWeight: 'bold'}}
                    onClick={modal.onClose}>Ok</button>
        );
    },
});