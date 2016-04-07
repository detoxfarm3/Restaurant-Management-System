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
            item: null,
            submitButton: null,
            onChange: null,
            onSubmit: null,
            placeholder: null,
        };
    },
    render: function () {

        var $this = this;
        var item = $this.props.item;
        var submitButton = $this.props.submitButton || (<span type="submit" className="btn btn-primary">Add</span>);
        var placeholder = $this.props.placeholder;

        return (
            <form onSubmit={$this.props.onSubmit}>

                <div className="form-group">
                    <label>Current Quantity</label>
                    <input type="text" className="form-control" id="quantity"
                           style={{width: '130px'}}
                           placeholder={''}
                           value={item.quantity} readOnly={true}/>

                </div>

                <div className="form-group">
                    <label forHtml="__quantity__">New Quantity</label>
                    <input type="text" className="form-control" id="__quantity__"
                           style={{width: '130px'}}
                           placeholder={placeholder}
                           name="__quantity__" value={item.__quantity__} onChange={$this.props.onChange}/>

                </div>

                {
                    !$this.props.units ? null : (
                        <div className="input-group">

                            <Select initialOption={{id: 0, name: 'Select Unit'}}
                                    name="unitId" value={item.unitId}
                                    options={$this.props.units}
                                    onChange={$this.props.onChange}/>

                        </div>
                    )
                }

                {
                    submitButton
                }
            </form>
        );
    }
});

module.exports = AddRemoveEditForm;