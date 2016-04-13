"use strict";
var React = require('react');
var Navbar = require('./navbar/Navbar');
var NavbarHeader = require('./navbar/NavbarHeader');
var NavbarCollapse = require('./navbar/NavbarCollapse');
var SidebarToggleButton = require('./SidebarToggleButton');

var SidebarMain = require('./sidebar-main/SidebarMain');
var SidebarHeader = require('./sidebar-main/SidebarHeader');
var Menu = require('./Menu');
var authService = require('./AuthService');

var ee = require('./EventEmitter');
var Events = require('./Events');

var Print = require('./print/Print');

var handlers = {};

var App;
module.exports = App = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            isSidebarMainOpen: false,
            isPrinterVisible: false,
        };
    },
    componentDidMount() {
        var $this = this;

        handlers[Events.PRINT] = req => {

            req.onComplete = () => {

                $this.setState({
                    isPrinterVisible: false,
                    printer: null
                });

            };

            $this.setState({
                isPrinterVisible: true,
                printer: req.printer
            }, req.callback);
        };

        for (var event in handlers) {
            ee.on(event, handlers[event]);
        }

    },
    componentWillUnmount: function () {
        var $this = this;

        for (var event in handlers) {
            ee.removeListener(event, handlers[event]);
        }
    },
    render: function () {
        var $this = this;

        var style = {};
        style.display = !!$this.state.isPrinterVisible ? 'none' : 'block';

        return (
            <div>

                <div id="app-content" className="container" style={style}>

                    {
                        !authService.isLoggedIn() ? null : (
                            <div className="row">
                                <div className="col-md-12">

                                    <Navbar>

                                        <NavbarHeader>
                                            <SidebarToggleButton onClick={$this.toggleSidebarMain}/>
                                <span className="navbar-brand"
                                      style={{cursor: 'pointer'}}>Dashboard</span>
                                        </NavbarHeader>

                                        <NavbarCollapse/>

                                    </Navbar>

                                </div>
                            </div>
                        )
                    }

                    <div className="row">
                        <div className="col-md-12">

                            {this.props.children}

                        </div>
                    </div>

                    <SidebarMain isOpen={$this.state.isSidebarMainOpen}>

                        <div className="panel panel-default">

                            <SidebarHeader onClick={$this.toggleSidebarMain}>
                                <h4 className="text-center">Click to hide</h4>
                            </SidebarHeader>

                            <Menu/>

                        </div>

                    </SidebarMain>

                </div>


                <Print isPrinterVisible={$this.state.isPrinterVisible}>

                    {
                        !$this.state.printer ? null : $this.state.printer()
                    }

                </Print>

            </div>
        );
    },
    toggleSidebarMain: function () {
        var $this = this;
        $this.setState({
            isSidebarMainOpen: !$this.state.isSidebarMainOpen
        });
    }
});