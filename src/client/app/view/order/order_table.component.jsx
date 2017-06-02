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
                ? <div className='alert alert-danger'>No orders found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>DelAddress</th>
                        <th>DelZip</th>
                        <th>DelCity</th>
                        <th>DelCountry</th>
                        <th>DelTerms</th>
                        <th>DelDate</th>
                        <th>Total (DKK)</th>
                        <th>Action</th>
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