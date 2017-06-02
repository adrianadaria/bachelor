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
                ? <div className='alert alert-danger'>No customers found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Zip</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>CVR</th>
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

export default CustomerTableComponent;