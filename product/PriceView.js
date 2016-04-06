var React = require('react');

var PriceView = React.createClass({
    getDefaultProps: function () {
        return {
            prices: []
        };
    },
    render: function () {
        var $this = this;
        var prices = $this.props.prices || [];
        return (
            <table className="table table-condensed" style={{margin: 0}}>
                <tbody>
                {
                    (prices).map(function (p) {
                        return (!p || !p.amount) ? '' : (
                            <tr key={Math.random()}>
                                <td>{p.amount} / {(p.unit || {}).name}</td>
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