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
                <td>{this.props.invoice.total}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeInvoiceMode('readOne', this.props.invoice.id)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeInvoiceMode('update', this.props.invoice.id)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeInvoiceMode('delete', this.props.invoice.id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default InvoiceTableRowComponent;