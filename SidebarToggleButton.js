"use strict";

import React from 'react';

class SidebarToggleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        var sst = {
            fontSize: '33px',
            paddingTop: '3px',
            marginRight: '8px',
            cursor: 'pointer',
        };

        return (

            <span type="button" className="pull-left" style={sst} onClick={$this.props.onClick}>
                <span className="glyphicon glyphicon-th-large" aria-hidden="true"></span>
            </span>
        );
    }
}

SidebarToggleButton.defaultProps = {
    onClick: null,
};

module.exports = SidebarToggleButton;