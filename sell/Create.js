var React = require('react');
var CreateSellGrid = require('./CreateSellGrid');
var Modal = require('../../components/Modal');
var CreateSellHeader = require('./CreateSellHeader');
var SellPreview = require('./SellPreview');
var ProductSelect = require('./ProductSelect');

var EventEmitter = require("events").EventEmitter;
var eeLocal = new EventEmitter();

var unitService = require('../unit/UnitService');
var productService = require('../product/ProductService');
var sellService = require('./SellService');

var lib = require('../../components/functions');

var Uris = require('../Uris');

var authService = require('../AuthService');

var LocalEvents = {
    SUBMIT_REQUESTED: 'SUBMIT_REQUESTED',
    SUBMIT_SUCCESSFULL: 'SUBMIT_SUCCESSFULL',
    SUBMIT_FAILED: 'SUBMIT_FAILED'
};

var ee = require('../EventEmitter');
var Events = require('../Events');

var KeyEventHandlers = require('../KeyEventsHandler');
var keyDownListeners = [];
var $ = require('jquery');

var CreateSell;
module.exports = CreateSell = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            productsById: {},
            unitsById: {},
            productsUnitWisePrice: {},
            sell: {
                consumerName: '',
                consumerMobile: '',
                sellDate: new Date(),
                createdBy: authService.currentUser(),
                status: true,
                remarks: ''
            },
            sellUnit: {},
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
        eeLocal.on(LocalEvents.SUBMIT_REQUESTED, function (sell) {
            console.log(sell);
            sellService.create(sell)
                .then(sellService.find)
                .then($this.showOrderSuccess)
                .then(() => {
                    $this.setState({
                        sell: lib.merge2($this.state.sell, {
                            consumerName: '',
                            consumerMobile: '',
                            remarks: '',
                        }),
                        sellUnit: {},
                        sellUnitsByProductId: {}
                    });
                    $this.clearAllUnits();
                })
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
                        productsByName: rsp.data.reduce((map, product) => {
                            map[product.name] = product;
                            return map;
                        }, {}),
                        productsBySku: rsp.data.reduce((map, product) => {
                            map[product.sku] = product;
                            return map;
                        }, {}),
                        //sellUnitsByProductId: sellUnits.reduce((map, sellUnit) => {
                        //    map[sellUnit.productId] = sellUnit;
                        //    return map;
                        //}, {})
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


        keyDownListeners.push(e => {
            if (e.altKey && e.keyCode === 66) {
                $('#create-button').click();
            }
            if (e.altKey && e.keyCode === 86) {
                $('#popup-ok-button').click();
            }
        });

        KeyEventHandlers.addAllKeyDownListeners(keyDownListeners);
    },
    componentWillUnmount: function () {
        eeLocal.removeAllListeners();

        KeyEventHandlers.removeAllKeyDownListeners(keyDownListeners);
    },
    render: function () {
        var $this = this;
        var modal = $this.state.modal;
        var sell = $this.state.sell;
        var sellUnitsByProductId = $this.state.sellUnitsByProductId || {};

        var productsUnitWisePrice = $this.state.productsUnitWisePrice || {};

        var productSelectUnits = Object.keys(productsUnitWisePrice[$this.state.sellUnit.productId] || {})
            .map(unitId => $this.state.unitsById[unitId]);

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
                                    <button id="create-button" className="btn btn-primary btn-block pull-right"
                                            style={{fontWeight: 'bold'}}
                                            onClick={$this.submit}>
                                        Create (ALT+B)
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
                                        Create (ALT+B)
                                    </button>

                                    <button className="btn btn-danger pull-right"
                                            style={{fontWeight: 'bold', marginRight: '30px'}}
                                            onClick={$this.clearAllUnits}>
                                        Clear All
                                    </button>

                                </div>
                            </div>

                        </div>

                        <ProductSelect products={$this.state.products} units={productSelectUnits}
                                       sellUnit={$this.state.sellUnit}
                                       onChange={$this.onSellUnitChange}
                                       onSubmit={$this.onSellUnitSubmit}
                            />

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
    onSellUnitSubmit: function (sellUnit) {
        var $this = this;
        var sellUnitsByProductId = $this.state.sellUnitsByProductId || {};

        if (sellUnit.productId > 0 && sellUnit.quantity > 0 && sellUnit.unitId > 0
            && !sellUnitsByProductId[sellUnit.productId]) {
            $this.createSellGrid.addNew(lib.copy(sellUnit));
            $this.setState({sellUnit: {}});
        }
    },
    onSellUnitChange: function (e) {

        var $this = this;
        var sellUnit = $this.state.sellUnit || {};

        if (e.target.name == "productName" || e.target.name == "productSku") {
            sellUnit.productName = '';
            sellUnit.productSku = '';
            sellUnit.unitId = '';
            sellUnit.productId = '';

            sellUnit[e.target.name] = e.target.value;

            var product = $this.state.productsByName[sellUnit.productName]
                || $this.state.productsBySku[sellUnit.productSku] || {};
            ;
            sellUnit.productId = product.id;

            if (!!product.id) {
                sellUnit.productName = product.name;
                sellUnit.productSku = product.sku;
            }
        }

        sellUnit[e.target.name] = e.target.value;

        if (!!sellUnit.productId) {
            var unitIds = Object.keys($this.state.productsUnitWisePrice[sellUnit.productId] || {});
            if (!!unitIds && !!unitIds.length && (unitIds.length === 1)) {
                sellUnit.unitId = unitIds[0];
            }
        }

        $this.setState({sellUnit: sellUnit});
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

        sell.sellUnits = Object.keys($this.state.sellUnitsByProductId || {}).map(id => $this.state.sellUnitsByProductId[id]);

        eeLocal.emit(LocalEvents.SUBMIT_REQUESTED, sell);
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
                        <div className="col-md-6">

                            <a href={Uris.toAbsoluteUri(Uris.SELL.VIEW, {id: sell.id})}
                               className="btn btn-success pull-left" style={{fontWeight: 'bold'}}>View
                            </a>

                            <a href={Uris.toAbsoluteUri(Uris.SELL.EDIT, {id: sell.id})}
                               className="btn btn-warning pull-left" style={{fontWeight: 'bold'}}>Edit
                            </a>

                        </div>
                        <div className="col-md-6">

                            <button className="btn btn-success btn-lg" style={{fontWeight: 'bold'}}
                                    onClick={e => {$this.closeModal(); $this.printSell(sell);}}>Print
                            </button>

                            <button id="popup-ok-button" className="btn btn-primary btn-lg" style={{fontWeight: 'bold'}}
                                    onClick={$this.closeModal}>Ok (ALT+V)
                            </button>
                        </div>
                    </div>
                ),
                isOpen: true,
            }
        });
    },
    printSell: function (sell) {
        var req = {
            printer: () => {
                return (
                    <SellPreview sell={sell}/>
                );
            },
            callback: () => {
                window.print()
                req.onComplete();
            },
        };

        ee.emit(Events.PRINT, req);
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