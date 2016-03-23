var React = require('react');

var PriceView = React.createClass({
    getDefaultProps: function () {
        return {
            price: []
        };
    },
    render: function () {
        var $this = this;
        var price = $this.props.price;
        return (
            <table className="table table-condensed" style={{margin: 0}}>
                <tbody>
                {
                    (price || []).map(function (p) {
                        return (!p || !p.amount) ? '' : (
                            <tr key={Math.random()}>
                                <th>{p.amount}</th>
                                <th> / {(p.unit || {}).name}</th>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
});

module.exports = PriceView;