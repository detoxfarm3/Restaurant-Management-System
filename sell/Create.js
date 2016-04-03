var React = require('react');
var CreateSellGrid = require('./CreateSellGrid');
var Modal = require('../../components/Modal');
var CreateSellHeader = require('./CreateSellHeader');
var SellPreview = require('./SellPreview');

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var Events = {
    SUBMIT_REQUESTED: 'SUBMIT_REQUESTED',
    SUBMIT_SUCCESSFULL: 'SUBMIT_SUCCESSFULL',
    SUBMIT_FAILED: 'SUBMIT_FAILED'
};

var CreateSell;
module.exports = CreateSell = React.createClass({
    getInitialState: function () {
        return {
            productsById: {
                1: {
                    id: 1,
                    name: 'Biriani'
                }
                ,
                2: {
                    id: 2,
                    name: 'Kaccchi'
                }
                ,
                3: {
                    id: 3,
                    name: 'Misti'
                }
                ,
                4: {
                    id: 4,
                    name: 'Doi'
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
                        productId: 1,
                    },
                    {
                        no: 2,
                        productId: 2,
                    },
                    {
                        no: 3,
                        productId: 3,
                    },
                    {
                        no: 4,
                        productId: 4,
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
        console.log("MOUNTING: SELL_CREATE");
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
        var sellUnitsByProductId = (sell.sellUnits || []).reduce(function (obj, unit) {
            obj[unit.productId] = unit;
            return obj;
        }, {});

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
                                        Create
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">

                            <CreateSellHeader sell={sell}/>

                        </div>
                    </div>

                    <div className="panel panel-default">

                        <button className="btn btn-primary pull-right"
                                style={{fontWeight: 'bold'}}
                                onClick={function () {$this.submit(sell);}}>
                            Create
                        </button>

                        <button className="btn btn-danger pull-right"
                                style={{fontWeight: 'bold'}}
                                onClick={$this.clearAllUnits}>
                            Clear All
                        </button>

                        <CreateSellGrid unitsById={$this.props.units} productsById={$this.state.productsById}
                                        productsUnitWisePrice={$this.props.productsUnitWisePrice}
                                        sellUnitsByProductId={sellUnitsByProductId}
                                        onChange={$this.onSaleUnitsChange} onInit={$this.onCreateSellGridInit}/>

                        <Modal title={modal.title} body={modal.body}
                               bodyStyle={{paddingBottom: '0', paddingTop: 0}}
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
    clearAllUnits: function () {
        this.createSellGrid.clearAllUnits();
    },
    onSaleUnitsChange: function (newSellUnitsByProductId, prevSellUnitsByProductId, unit) {
        var $this = this;
        $this.setState({
            sell: {
                sellUnits: Object.keys(newSellUnitsByProductId).map(id => newSellUnitsByProductId[id])
            }
        });
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

        sell.remarks = "Kala";

        $this.setState({
            modal: {
                title: (
                    <h4 className="modal-title text-primary" id="myModalLabel">
                        Order created successfully. Order ID: <strong
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