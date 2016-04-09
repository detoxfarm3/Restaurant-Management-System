"use strict";

import React from 'react';
var Modal = require('../components/Modal');
var userService = require('./user/UserService');
var lib = require('../components/functions');

class ChangePasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        };
    }

    render() {
        var $this = this;
        var user = $this.state.user;

        var header = (
            <h3 className="modal-title text-primary">Change Password</h3>
        );

        var body = (

            <form onSubmit={e => {e.preventDefault(); $this.onSubmit.call($this)}}>

                <div className="form-group">
                    <label htmlFor="username">Current Password</label>
                    <input type="password" className="form-control" id="currentPassword" placeholder="Current Password"
                           name="currentPassword" value={user.currentPassword} onChange={$this.onChange.bind($this)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" className="form-control" id="password" placeholder="New Password"
                           name="password" value={user.password} onChange={$this.onChange.bind($this)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Retype New Password</label>
                    <input type="password" className="form-control" placeholder="Retype New Password"
                           id="retypePassword" name="retypePassword" value={user.retypePassword}
                           onChange={$this.onChange.bind($this)}/>
                </div>

                <input type="submit" style={{display: 'none'}}/>

            </form>
        );

        var footer = (
            <div>
                <span className="btn btn-primary pull-right"
                      onClick={$this.onSubmit.bind($this)}>Change</span>
                <span className="btn btn-danger pull-right" style={{marginRight: '10px'}}
                      onClick={$this.props.onClose}>Cancel</span>
            </div>
        );

        return (

            <Modal title={header}
                   body={body}
                   footer={footer}
                   onClose={$this.props.onClose} isOpen={$this.props.isOpen}/>

        );
    }

    onSubmit() {
        var $this = this;
        userService.changePassword($this.state.user)
            .then(() => $this.setState({user: {}}))
        ;
    }

    onChange(e) {
        var $this = this;
        var user = $this.state.user || {};
        user[e.target.name] = e.target.value;
        $this.setState({
            user: user
        });
    }
}

ChangePasswordForm.defaultProps = {
    user: {},
    isOpen: false,
    onClose: null,
};

module.exports = ChangePasswordForm;