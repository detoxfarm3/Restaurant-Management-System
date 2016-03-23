var React = require('react');
var Select = React.createClass({
    getDefaultProps: function () {
        return {
            className: "form-control",
            initialOption: null,
            options: [],
            onChange: null,
        };
    },
    render: function () {
        var $this = this;
        var className = $this.props.className;
        var initialOption = $this.props.initialOption;
        var options = $this.props.options || [];
        return (
            <select id={$this.props.id} className={className} name={$this.props.name} value={$this.props.value}
                    onChange={$this.props.onChange}>
                {
                    !initialOption ? null : (
                        <option value={initialOption.id}>{initialOption.name}</option>)
                }
                {
                    options.map(function (op) {
                        return (
                            <option key={op.id} value={op.id}>{op.name}</option>
                        );
                    })
                }
            </select>
        );
    }
});

module.exports = Select;