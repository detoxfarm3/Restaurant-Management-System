var React = require('react');
var Select = require('../utils/Select');

var AddAnotherProductForm = React.createClass({
    getDefaultProps: function () {
        return {
            products: [
                {id: 1, name: 'op-1'},
                {id: 2, name: 'op-2'},
                {id: 3, name: 'op-3'}
            ],
            productsUnitWisePrice: {},
            units: [
                {id: 1, name: 'op-1'},
                {id: 2, name: 'op-2'},
                {id: 3, name: 'op-3'}
            ],
            product: {
                productId: null,
                quantity: null,
                unitId: null,
            }
        };
    },
    render: function () {
        var $this = this;
        var product = $this.props.product;
        return (
            <form onSubmit={$this.props.onSubmit}>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="productId">Product</label>

                            <Select id="productId" name="productId" value={product.productId}
                                    initialOption={{id: 0, name: 'Select Product'}}
                                    options={$this.props.products || []}
                                    onChange={$this.props.onChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" className="form-control" placeholder="Quantity"
                                   id="quantity" name="quantity" value={product.quantity}
                                   onChange={$this.props.onChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="unitId">Unit</label>
                            <Select id="unitId" name="unitId" value={product.unitId}
                                    initialOption={{id: 0, name: 'Select Unit'}}
                                    options={$this.props.units}
                                    onChange={$this.props.onChange}/>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
});

module.exports = AddAnotherProductForm;