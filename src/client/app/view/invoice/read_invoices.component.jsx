import React from 'react';
import $ from 'jquery';

import InvoiceTableComponent from './invoice_table.component.jsx';
import ReadOneInvoiceComponent from './read_one_invoice.component.jsx';
import DeleteInvoiceComponent from './delete_invoice.component.jsx';

class ReadInvoicesComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            invoiceId: null,
            invoices: []
        };

        this.changeInvoiceMode = this.changeInvoiceMode.bind(this);
        this.fetchInvoices = this.fetchInvoices.bind(this);
    }

    fetchInvoices() {
        if(this.serverRequest) {
            this.serverRequest.abort();
        }

        this.serverRequest = $.get("http://localhost/api/invoice/read.php", (invoice) => {
            this.setState({
                invoices: invoice.records
            });
        });
    }

    componentDidMount() {
        this.fetchInvoices();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeInvoiceMode(newMode, invoiceId) {
        this.setState({currentMode: newMode});

        if(invoiceId !== undefined) {
            this.setState({invoiceId: invoiceId});
        }
    }

    // render component on the page
    render() {
        let filteredInvoices = this.state.invoices;
        let modeComponent = <InvoiceTableComponent invoices={filteredInvoices} changeInvoiceMode={this.changeInvoiceMode} />;
        let bar = null;

        switch(this.state.currentMode) {
            case 'read':
                bar = (
                    <a href='#' onClick={() => this.fetchInvoices()} className='btn btn-info m-r-1em'> refresh
                    </a>
                );
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneInvoiceComponent invId={this.state.invoiceId} changeInvoiceMode={this.changeInvoiceMode}/>;
                break;
            case 'delete':
                modeComponent =
                    <DeleteInvoiceComponent invId={this.state.invoiceId} changeInvoiceMode={this.changeInvoiceMode}/>;
                break;
            default:
                break;
        }

        return (
            <div className='overflow-hidden'>
                {
                    bar !== null ?
                        bar
                        : null
                }
                {modeComponent}
            </div>
        );
    }

}

export default ReadInvoicesComponent;