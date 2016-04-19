"use strict";

import React from 'react';
var ProductNameAutoComplete = require('../product/ProductNameAutoComplete');
var ProductSkuAutoComplete = require('../product/ProductSkuAutoComplete');

class ProductSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var $this = this;
        var sellUnit = $this.props.sellUnit || {};

        return (

            <form className="form-inline alert-success"
                  onSubmit={e => {e.preventDefault(); $this.props.onSubmit(sellUnit);}}>
                <div className="form-group">
                    <ProductNameAutoComplete className="form-control"
                                             id="productName"
                                             name="productName"
                                             value={sellUnit.productName}
                                             onChange={$this.props.onChange}
                                             placeholder="Name"
                                             products={$this.props.products}
                        />
                </div>
                <div className="form-group">
                    <ProductSkuAutoComplete className="form-control"
                                            id="productSku"
                                            name="productSku"
                                            value={sellUnit.productSku}
                                            onChange={$this.props.onChange}
                                            placeholder="SKU"
                                            products={$this.props.products}
                        />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control"
                           id="quantity"
                           name="quantity"
                           value={sellUnit.quantity}
                           onChange={$this.props.onChange}
                           placeholder="Quantity"/>
                </div>
                <div className="form-group">
                    <select className="form-control"
                            id="unitId"
                            name="unitId"
                            value={sellUnit.unitId || ''}
                            onChange={$this.props.onChange}
                            placeholder="Unit">
                        <option value={''}>Select Unit</option>
                        {
                            ($this.props.units || []).map(u => {
                                return (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Add</button>
            </form>

        );
    }
}

ProductSelect.defaultProps = {
    onSubmit: () => null,
    sellUnit: {},
    products: [],
    units: [],
    onChange: () => null
};

module.exports = ProductSelect;