"use strict";

import React from 'react';

class SidebarFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        return (

            <div className="panel-footer" onClick={$this.props.onClick}>
                <div className="row">
                    <div className="col-md-12">

                        {$this.props.children}

                    </div>
                </div>
            </div>

        );
    }
}

SidebarFooter.defaultProps = {
    onClick: null,
};

module.exports = SidebarFooter;