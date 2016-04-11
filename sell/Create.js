var React = require('react');
var CreateSellGrid = require('./CreateSellGrid');
var Modal = require('../../components/Modal');
var CreateSellHeader = require('./CreateSellHeader');
var SellPreview = require('./SellPreview');

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var unitService = require('../unit/UnitService');
var productService = require('../product/ProductService');
var sellService = require('./SellService');

var lib = require('../../components/functions');

var Uris = require('../Uris');

var authService = require('../AuthService');

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
            unitsById: {
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
                consumerName: '',
                consumerMobile: '',
                sellDate: new Date(),
                createdBy: authService.currentUser(),
                status: true,
                remarks: ''
            },
            sellUnitsByProductId: {},
            modal: {
                body: '',
                footer: '',
                title: '',
                isOpen: false,
            },
        };
    },
    componentDidMount: function () {

        var $this = this;

        console.log("MOUNTING: SELL_CREATE");
        ee.on(Events.SUBMIT_REQUESTED, function (sell) {
            console.log(sell);
            sellService.create(sell)
                .then(sellService.find)
                .then($this.showOrderSuccess)
            ;
        });

        var productPromise1 = productService.findAllDecomposed({forSale: true})
                .then(rsp => {
                    var sellUnits = rsp.data.map(function (product) {
                        return {no: Math.random(), productId: product.id};
                    });
                    return {
                        products: rsp.data,
                        productsById: rsp.data.reduce(function (map, product) {
                            map[product.id] = product;
                            return map;
                        }, {}),
                        sellUnitsByProductId: sellUnits.reduce((map, sellUnit) => {
                            map[sellUnit.productId] = sellUnit;
                            return map;
                        }, {})
                    };
                })
            ;

        var productPromise2 = productService.unitWisePrice()
                .then(unitWisePrice => {
                    return {productsUnitWisePrice: unitWisePrice};
                })
            ;

        var unitPromise = unitService.findAllUnits()
                .then(rsp => {
                    return {
                        units: rsp.data,
                        unitsById: rsp.data.reduce(function (map, unit) {
                            map[unit.id] = unit;
                            return map;
                        }, {})
                    };
                })
            ;

        Promise.all([productPromise1, productPromise2, unitPromise])
            .then((states) => {

                var state = states.reduce((newState, state) => {
                    for (var x in state) {
                        newState[x] = state[x];
                    }
                    return newState;
                }, {});

                state.sellUnitsByProductId = $this.interceptSellUnits(state.sellUnitsByProductId, state.productsUnitWisePrice);

                $this.setState(state);
            })
        ;
    },
    componentWillUnmount: function () {
        ee.removeAllListeners();
    },
    render: function () {
        var $this = this;
        var modal = $this.state.modal;
        var sell = $this.state.sell;
        var sellUnitsByProductId = $this.state.sellUnitsByProductId;

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
                                            onClick={$this.submit}>
                                        Create
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="panel-body">

                            <CreateSellHeader sell={sell} onChange={$this.onSellChange}/>

                        </div>
                    </div>

                    <div className="panel panel-default">

                        <div className="panel-heading">

                            <div className="row">
                                <div className="col-md-2">
                                    Products
                                </div>
                                <div className="col-md-10">

                                    <div className="checkbox"
                                         style={{marginRight: '30px', display: 'inline-block'}}>

                                        <label style={{fontWeight: 'initial'}}>

                                            <input type="checkbox" name="status"
                                                   value={sell.status}
                                                   checked={!!sell.status}
                                                   onChange={e => {
                                                        sell.status = !sell.status;
                                                        $this.setState({sell: sell});
                                                   }}
                                                />

                                            {!!sell.status ? (
                                                <span><strong>Clear</strong> / Holding</span>
                                            ) : (
                                                <span>Clear / <strong>Holding</strong></span>
                                            )}

                                        </label>
                                    </div>

                                    <button className="btn btn-primary pull-right"
                                            style={{fontWeight: 'bold'}}
                                            onClick={$this.submit}>
                                        Create
                                    </button>

                                    <button className="btn btn-danger pull-right"
                                            style={{fontWeight: 'bold', marginRight: '30px'}}
                                            onClick={$this.clearAllUnits}>
                                        Clear All
                                    </button>

                                </div>
                            </div>

                        </div>

                        <CreateSellGrid unitsById={$this.state.unitsById} productsById={$this.state.productsById}
                                        productsUnitWisePrice={$this.state.productsUnitWisePrice}
                                        sellUnitsByProductId={sellUnitsByProductId}
                                        onChange={$this.onSaleUnitsChange} onInit={$this.onCreateSellGridInit}/>

                        <Modal title={modal.title} body={modal.body}
                               bodyStyle={{paddingBottom: '0', paddingTop: 0}}
                               footer={modal.footer || $this.defaultModalFooter(modal)}
                               isOpen={modal.isOpen} onClose={$this.closeModal}/>
                    </div>


                    <div className="panel panel-default">

                        <div className="panel-body">

                            <form className="form-horizontal">
                                <div className="form-group">

                                    <label htmlFor="remarks" className="col-sm-2 control-label"
                                           style={{textAlign: 'left'}}>Remarks:</label>

                                    <div className="col-sm-10">
                                        <textarea className="form-control" rows="3" placeholder="Remarks"
                                                  name="remarks" value={sell.remarks} onChange={$this.onSellChange}/>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        );
    },
    onSellChange: function (e) {
        var $this = this;
        var sell = $this.state.sell || {};
        sell[e.target.name] = e.target.value;
        $this.setState({sell: sell});
    },
    onCreateSellGridInit: function (createSellGrid) {
        this.createSellGrid = createSellGrid;
    },
    clearAllUnits: function () {
        this.createSellGrid.clearAllUnits();
    },
    onSaleUnitsChange: function (newSellUnitsByProductId) {
        var $this = this;
        $this.setState({
            sellUnitsByProductId: $this.interceptSellUnits(newSellUnitsByProductId, $this.state.productsUnitWisePrice),
        });
    },
    submit: function (e) {
        var $this = this;
        var sell = $this.state.sell;

        sell.sellUnits = Object.keys($this.state.sellUnitsByProductId).map(id => $this.state.sellUnitsByProductId[id]);

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
                        Order created successfully. Order ID: <strong
                        style={{fontWeight: 'bold', fontSize: '20px'}}> {sell.orderId} </strong></h4>
                ),
                body: (
                    <SellPreview sell={sell}/>
                ),
                footer: (
                    <div className="row">
                        <div className="col-md-10">

                            <a href={Uris.toAbsoluteUri(Uris.SELL.VIEW, {id: sell.id})}
                               className="btn btn-success pull-left" style={{fontWeight: 'bold'}}>View
                            </a>

                            <a href={Uris.toAbsoluteUri(Uris.SELL.EDIT, {id: sell.id})}
                               className="btn btn-warning pull-left" style={{fontWeight: 'bold'}}>Edit
                            </a>

                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-lg" style={{fontWeight: 'bold'}}
                                    onClick={$this.closeModal}>Ok
                            </button>
                        </div>
                    </div>
                ),
                isOpen: true,
            }
        });
    },
    closeModal: function () {
        var $this = this;
        $this.setState({modal: {isOpen: false}});
    },
    defaultModalFooter: function (modal) {
        var $this = this;
        return (
            <button className="btn btn-primary btn-lg" style={{fontWeight: 'bold'}}
                    onClick={$this.closeModal}>Ok</button>
        );
    },
    interceptSellUnits: function (sellUnitsByProductId, productsUnitWisePrice) {
        var $this = this;
        for (var x in sellUnitsByProductId) {
            var su = sellUnitsByProductId[x] || {};

            var priceByUnitIds = productsUnitWisePrice[su.productId] || {};

            if (Object.keys(priceByUnitIds).length == 1) {
                su.unitId = Object.keys(priceByUnitIds).reduce((unitId, id) => unitId || id, null);
            }

            su.unitPrice = priceByUnitIds[su.unitId] || undefined;
            su.total = su.quantity * su.unitPrice;
        }

        return sellUnitsByProductId;
    }
});