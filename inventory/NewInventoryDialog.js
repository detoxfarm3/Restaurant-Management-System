"use strict";
import React from 'react'
var Modal = require('.././Modal');
var NewInventoryForm = require('./NewInventoryForm');
var lib = require('.././functions');

var inventoryService = require('./InventoryService');

var NewInventoryDialog;
module.exports = NewInventoryDialog = React.createClass({
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
            inventory: {},

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
            inventory: {}
        });
    },

    createNewInventory: function () {
        var $this = this;

        $this.setState({
            createModal: function () {
                return {
                    isOpen: true,
                    onClose: $this.closeModal,
                    title: 'Create New Inventory.',
                    body: (
                        <div className="row">

                            <div className="col-md-12">

                                <NewInventoryForm inventory={$this.state.inventory} onChange={$this.onInventoryChange}/>

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
        inventoryService.create($this.state.inventory)
            .then(() => {
                $this.closeModal();
            })
        ;
    },
    onInventoryChange: function onInventoryChange(e) {
        var $this = this;
        var inventory = lib.copy($this.state.inventory);
        inventory[e.target.name] = e.target.value;

        $this.setState({inventory: inventory});
    }
});