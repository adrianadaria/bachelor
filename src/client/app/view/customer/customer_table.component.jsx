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
                    <table className="table_list table_customers">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">CUSTOMERS</h4></caption>
                        <thead>
                        <tr>
                            <th><h5 className="smaller_title">Number</h5></th>
                            <th><h5 className="smaller_title">Name</h5></th>
                            <th><h5 className="smaller_title">Email</h5></th>
                            <th><h5 className="smaller_title">Address</h5></th>
                            <th className="smaller_width"><h5 className="smaller_title">Zip</h5></th>
                            <th><h5 className="smaller_title">City</h5></th>
                            <th><h5 className="smaller_title">Country</h5></th>
                            <th><h5 className="smaller_title">CVR</h5></th>
                            <th className="extra_width smaller_title"><h5>Action</h5></th>
                        </tr>
                        </thead>
                        <tbody className="table_customer">
                            {rows}
                        </tbody>
                    </table>
        );
    }
}

export default CustomerTableComponent;