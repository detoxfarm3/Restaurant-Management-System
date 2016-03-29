"use strict";

import React from 'react';

class SidebarMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        var isOpen = $this.props.isOpen;

        var style = {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            width: isOpen ? '250px' : '0',
            display: isOpen ? 'block' : 'none',
            border: '1px solid black',
            height: '100%',
            backgroundColor: 'white',
            overflow: 'hidden'
        };

        return (

            <div style={style}>
                {this.props.children}
            </div>

        );
    }
}

SidebarMain.defaultProps = {
    isOpen: false,
};

module.exports = SidebarMain;