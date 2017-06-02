import React from 'react';
import CustomerTableRowComponent from './customer_table_row.component.jsx';

class CustomerTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.customers.map(function(customer, i) {
            return (
                <CustomerTableRowComponent key={i} customer={customer} changeCustomerMode={this.props.changeCustomerMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <h4>NO CUSTOMERS FOUND</h4>
                :
                    <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">CUSTOMERS</h4></caption>
                        <thead>
                        <tr>
                            <th><h5>Number</h5></th>
                            <th><h5>Name</h5></th>
                            <th><h5>Email</h5></th>
                            <th><h5>Address</h5></th>
                            <th className="smaller_width"><h5>Zip</h5></th>
                            <th><h5>City</h5></th>
                            <th><h5>Country</h5></th>
                            <th><h5>CVR</h5></th>
                            <th className="extra_width"><h5>Action</h5></th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>

        );
    }
}

export default CustomerTableComponent;