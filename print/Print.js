"use strict";

import React from 'react';

class Print extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;

        var style = {};

        if (!!$this.props.isVisible) {
            style.display = "block";
        } else {
            style.display = "none";
        }

        return (

            <div id="printing-area">

                {$this.props.children}

            </div>
        );
    }
}

Print.defaultProps = {
    isVisible: false
};

module.exports = Print;