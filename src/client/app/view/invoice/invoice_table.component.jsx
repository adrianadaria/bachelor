import React from 'react';

import InvoiceTableRowComponent from './invoice_table_row.component.jsx';

class InvoiceTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.invoices.map(function(invoice, i) {
            return (
                <InvoiceTableRowComponent key={i} invoice={invoice} changeInvoiceMode={this.props.changeInvoiceMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <div className='alert alert-danger'>No invoices found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Date</th>
                        <th>CustomerName</th>
                        <th>Amount</th>
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

export default InvoiceTableComponent;