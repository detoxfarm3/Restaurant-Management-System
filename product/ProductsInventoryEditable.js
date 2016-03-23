var React = require('react');

var ProductsInventoryEditable = React.createClass({
    getDefaultProps: function () {
        return {
            inventories: [],
            units: [],
            onChange: function () {
            },
            removeItem: function () {
            }
        };
    },
    render: function () {
        var $this = this;
        var inventories = $this.props.inventories || [];
        var units = $this.props.units || [];
        return (
            <table className="table table-striped">

                <thead>
                <tr>
                    <th>Inventory</th>
                    <th colSpan="1">Quantity</th>
                    <th colSpan="1">Available</th>
                    <th colSpan="1">Unit</th>
                    <th colSpan="1">Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    inventories.map(function (item) {
                        var inventory = (item.inventory || {});
                        return (
                            <tr key={item.id}>
                                <td>{inventory.name}</td>
                                <td><input className="form-control" type="number"
                                           name="quantity" value={(item.quantity)}
                                           onChange={function (e) {
                                                $this.props.onChange(e, item, inventories)
                                           }}/></td>
                                <td><input className="form-control" type="number"
                                           name="available" value={(item.available)}
                                           onChange={function (e) {
                                                $this.props.onChange(e, item, inventories)
                                           }}/></td>
                                <td>
                                    <select className="form-control"
                                            name="unitId" value={item.unitId}
                                            onChange={function (e) {
                                                $this.props.onChange(e, item, inventories)
                                            }}>
                                        {
                                            ($this.props.units || []).map(function (u) {
                                                return (
                                                    <option key={u.id} value={u.id}>{u.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </td>
                                <td colSpan="1">
                                    <span className="btn btn-danger" onClick={function () {
                                        if(!!$this.props.removeItem) $this.props.removeItem(item, inventories);
                                    }}>
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </span>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>

            </table>
        );
    },
});

module.exports = ProductsInventoryEditable;