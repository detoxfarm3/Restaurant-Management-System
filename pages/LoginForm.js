"use strict";

import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;
        var user = $this.props.user;
        return (
            <form method="post" onSubmit={e => {
                e.preventDefault();
                $this.props.onSubmit(user);
            }}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                           name="username" value={user.username} onChange={$this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                           name="password" value={user.password} onChange={$this.props.onChange}/>
                </div>
                <input type="submit" style={{display: 'none'}}/>
            </form>
        );
    }
}

LoginForm.defaultProps = {
    user: {},
    onChange: null,
    onSubmit: null,
};

module.exports = LoginForm;