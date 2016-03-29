"use strict";
import React from 'react'
var Modal = require('../../components/Modal');
var NewUnitForm = require('./NewUnitForm');
var lib = require('.././functions');

var unitService = require('./UnitService');

var NewUnitDialog;
module.exports = NewUnitDialog = React.createClass({
    getDefaultProps: function () {
        return {
            onInit: function () {
            }
        };
    },
    getInitialState: function () {
        return {
            createModal: function () {
            },
            unit: {},

        };
    },
    componentDidMount: function () {
        var $this = this;
        if (!!$this.props.onInit) $this.props.onInit($this);
    },
    render: function () {
        var $this = this;
        var createModal = $this.state.createModal;
        var modal = !!createModal ? createModal() || {} : {};
        return (

            <Modal title={modal.title} body={modal.body} isOpen={!!modal.isOpen} onClose={modal.onClose}
                   footer={modal.footer} bodyStyle={modal.bodyStyle}/>
        );
    },

    closeModal: function () {
        var $this = this;
        $this.setState({
            createModal: function () {
                return {isOpen: false};
            },
            unit: {}
        });
    },

    createNewUnit: function () {
        var $this = this

        $this.setState({
            createModal: function () {
                return {
                    isOpen: true,
                    onClose: $this.closeModal,
                    title: 'Create New Unit.',
                    body: (
                        <div className="row">

                            <div className="col-md-12">

                                <NewUnitForm unit={$this.state.unit} onChange={$this.onUnitChange}/>

                            </div>

                        </div>
                    ),
                    footer: (
                        <div>
                            <span className="btn btn-primary pull-right" onClick={$this.submit}>Ok</span>
                            <span className="btn btn-danger pull-right" onClick={$this.closeModal}
                                  style={{marginRight: '5px'}}>Cancel</span>
                        </div>
                    ),
                    bodyStyle: {paddingTop: 0}
                };
            }
        });
    },

    submit: function () {
        var $this = this;
        unitService.create($this.state.unit);
        $this.closeModal();
    },

    onUnitChange: function onUnitChange(e) {
        var $this = this;
        var unit = lib.copy($this.state.unit);
        unit[e.target.name] = e.target.value;

        $this.setState({unit: unit});
    }
});