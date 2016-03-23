import Autosuggest from 'react-autosuggest';
var React = require('react');
var InventoryAutoComplete = require('./InventoryAutoComplete');

var NewInventoryForm = React.createClass({
    getDefaultProps: function () {
        return {
            inventory: {},
            onChange: function () {
            }
        };
    },
    render: function () {
        var $this = this;
        var inventory = $this.props.inventory || {};
        var onChange = $this.props.onChange || function () {
            };

        return (
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <InventoryAutoComplete id="name" name="name" value={inventory.name}
                                              onChange={onChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <textarea id="remarks" className="form-control" placeholder="Remarks"
                              name="remarks" value={inventory.remarks}
                              onChange={onChange}/>
                </div>
            </form>
        );
    }
});

module.exports = NewInventoryForm;