"use strict";

import React from 'react';

class SidebarHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        return (

            <div className="panel-heading" onClick={$this.props.onClick} style={{cursor: 'pointer'}}>
                <div className="row">
                    <div className="col-md-12">

                        {$this.props.children}

                    </div>
                </div>
            </div>

        );
    }
}

SidebarHeader.defaultProps = {
    onClick: null,
};

module.exports = SidebarHeader;