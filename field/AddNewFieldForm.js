"use strict";
import React from 'react'

var AddNewFieldForm;
module.exports = AddNewFieldForm = React.createClass({
    getDefaultProps: function () {
        var fieldId = 1;
        return {
            field: {},
            fieldTypes: [
                {id: fieldId++, name: 'TEXT'},
                {id: fieldId++, name: 'LONG TEXT'},
                {id: fieldId++, name: 'NUMBER'},
                {id: fieldId++, name: 'DECIMAL NUMBER'},
                {id: fieldId++, name: 'DATE'},
                {id: fieldId++, name: 'DATETIME'},
                {id: fieldId++, name: 'YES/NO'},
            ]
        };
    },
    render: function () {
        var $this = this;
        var field = $this.props.field || {};
        var fieldTypes = $this.props.fieldTypes || [];
        return (
            <form>

                <div className="row">

                    <div className="form-group col-md-12">
                        <label htmlFor="name">Field Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Field Name"
                               name="name" value={field.name}/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="type">Field Type</label>
                        <select className="form-control" id="type"
                                name="type" value={field.type}>
                            <option value={0}>Select Field Type</option>
                            {
                                fieldTypes.map(function (type) {
                                    return (
                                        <option value={type.id}>{type.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="value">Field Value</label>
                        <input type="text" className="form-control" id="value" placeholder="Field Value"
                               name="value" value={field.value}/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="defaultValue">Default Value</label>
                        <input type="text" className="form-control" id="defaultValue" placeholder="Default Value"
                               name="defaultValue" value={field.defaultValue}/>
                    </div>

                </div>

            </form>
        );
    }
})