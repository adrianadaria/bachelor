import React from 'react';

class InvoiceTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.invoice.id}</td>
                <td>{this.props.invoice.date}</td>
                <td>{this.props.invoice.name}</td>
                <td>{parseFloat(this.props.invoice.total).toFixed(2)}</td>
                <td>
                    <a href='#' onClick={() => this.props.changeInvoiceMode('readOne', this.props.invoice.id)}>
                       <div className="action_btn view" />
                    </a>
                    <a href='#' onClick={() => this.props.changeInvoiceMode('delete', this.props.invoice.id)}>
                        <div className="action_btn delete" />
                    </a>
                </td>
            </tr>
        );
    }

}

export default InvoiceTableRowComponent;