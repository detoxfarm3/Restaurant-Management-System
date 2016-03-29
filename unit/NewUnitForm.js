import Autosuggest from 'react-autosuggest';
var React = require('react');
var UnitAutoComplete = require('./../inventory/InventoryAutoComplete');

var NewUnitForm = React.createClass({
    getDefaultProps: function () {
        return {
            unit: {},
            onChange: function () {
            }
        };
    },
    render: function () {
        var $this = this;
        var unit = $this.props.unit || {};
        var onChange = $this.props.onChange || function () {
            };

        return (
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <UnitAutoComplete id="name" name="name" value={unit.name}
                                              onChange={onChange}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" className="form-control" placeholder="Full Name"
                                   id="fullName" name="fullName" value={unit.fullName}
                                   onChange={onChange}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="remarks">Remarks</label>
                    <textarea id="remarks" className="form-control" placeholder="Remarks"
                              name="remarks" value={unit.remarks}
                              onChange={onChange}/>
                </div>
            </form>
        );
    }
});

module.exports = NewUnitForm;