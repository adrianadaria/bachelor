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
                        <th><h5 className="smaller_title">DelAddress</h5></th>
                        <th><h5 className="smaller_title">DelZip</h5></th>
                        <th><h5 className="smaller_title">DelCity</h5></th>
                        <th><h5 className="smaller_title">DelCountry</h5></th>
                        <th><h5 className="smaller_title">DelTerms</h5></th>
                        <th><h5 className="smaller_title">DelDate</h5></th>
                        <th><h5 className="smaller_title">Total (DKK)</h5></th>
                        <th className="extra_width"><h5 >Action</h5></th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default OrderTableComponent;