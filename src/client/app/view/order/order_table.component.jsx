import React from 'react';
import OrderTableRowComponent from './order_table_row.component.jsx';

class OrderTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.orders.map(function(order, i) {
            return (
                <OrderTableRowComponent key={i} order={order} changeOrderMode={this.props.changeOrderMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <h4>NO ORDERS FOUND</h4>
                :
                <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">ORDERS</h4></caption>
                    <thead>
                    <tr>
                        <th><h5 className="smaller_title">Id</h5></th>
                        <th><h5 className="smaller_title">Name</h5></th>
                        <th><h5 className="smaller_title">Date</h5></th>
                        <th><h5 className="smaller_title">Delivery Address</h5></th>
                        <th><h5 className="smaller_title">Delivery Zip</h5></th>
                        <th><h5 className="smaller_title">Delivery City</h5></th>
                        <th><h5 className="smaller_title">Delivery Country</h5></th>
                        <th><h5 className="smaller_title">Delivery Terms</h5></th>
                        <th><h5 className="smaller_title">Delivery Date</h5></th>
                        <th><h5 className="smaller_title">Total (DKK)</h5></th>
                        <th className="extra_width"><h5 >Action</h5></th>
                    </tr>
                    </thead>
                    <tbody className="table_order">
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default OrderTableComponent;