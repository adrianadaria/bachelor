import React from 'react';
import $ from 'jquery';

import InvoiceTableComponent from './invoice_table.component.jsx';

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
        this.serverRequest = $.get("http://localhost/api/invoice/read.php", (invoice) => {
            this.setState({
                invoices: invoice.records
            });
        });
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchInvoices();
    }

    // on unmount, kill product fetching in case the request is still pending
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
        $('.page-header h1').text('Read Invoices');
        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                //modeComponent =
                //    <ReadOneProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'create':
                //modeComponent = <CreateProductComponent changeProductMode={this.changeProductMode}/>;
                break;
            case 'update':
                //modeComponent =
                //   <UpdateProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'delete':
                //modeComponent =
                //    <DeleteProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            default:
                break;
        }

        return (
            //if current mode read render tobar
            <div className="container equal">
                <div className="col-left bg-grey left-typo scroll">
                    {modeComponent}
                </div>
                <div className="col-right bg-yellow">
                </div>
            </div>
        );
    }

}

export default ReadInvoicesComponent;