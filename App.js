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

var App;
module.exports = App = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            isSidebarMainOpen: false,
        };
    },
    render: function () {
        var $this = this;

        return (
            <div id="app" className="container">

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
        );
    },
    toggleSidebarMain: function () {
        var $this = this;
        $this.setState({
            isSidebarMainOpen: !$this.state.isSidebarMainOpen
        });
    }
});