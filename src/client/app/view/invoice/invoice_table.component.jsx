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
                ? <h4>NO INVOICES FOUND</h4>
                :
               <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">INVOICES</h4></caption>
                    <thead>
                    <tr>
                        <th><h5>Number</h5></th>
                        <th><h5>Date</h5></th>
                        <th><h5>CustomerName</h5></th>
                        <th><h5>Amount</h5></th>
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

export default InvoiceTableComponent;