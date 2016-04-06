var React = require('react');
var Select = require('../utils/Select');

var AddRemoveEditForm = React.createClass({
    getDefaultProps: function () {
        return {
            units: [
                {id: 1, name: 'op-1'},
                {id: 2, name: 'op-2'},
                {id: 3, name: 'op-3'}
            ],
            quantity: null,
            unitId: null,
            submitButton: null,
            onChange: null,
            onSubmit: null,
            placeholder: null,
        };
    },
    render: function () {

        var $this = this;
        var quantity = $this.props.quantity;
        var submitButton = $this.props.submitButton || (<span type="submit" className="btn btn-primary">Add</span>);
        var placeholder = $this.props.placeholder;

        return (
            <form className="form-inline" onSubmit={$this.props.onSubmit}>
                <div className="form-group">
                    <label className="sr-only" htmlFor="quantity">{placeholder}</label>

                    <div className="input-group">

                        <input type="text" className="form-control" id="quantity"
                               style={{width: '130px'}}
                               placeholder={placeholder}
                               name="quantity" value={quantity} onChange={$this.props.onChange}/>

                    </div>

                    {
                        !$this.props.units ? null : (
                            <div className="input-group">

                                <Select initialOption={{id: 0, name: 'Select Unit'}}
                                        name="unitId" value={$this.props.unitId}
                                        options={$this.props.units}/>

                            </div>
                        )
                    }

                </div>
                {
                    submitButton
                }
            </form>
        );
    }
});

module.exports = AddRemoveEditForm;