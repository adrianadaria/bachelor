import React from 'react';
import $ from 'jquery';

class ReadInvoicesComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            invoiceId: null,
            invoices: []
        }

        this.changeInvoiceMode = this.changeInvoiceMode.bind(this);
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        /*this.serverRequest = $.get("http://localhost/api/product/read.php", (products) => {
                this.setState({
                    products: products
                });
        });*/
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        //this.serverRequest.abort();
    }

    changeInvoiceMode(newMode, invoiceId) {
        this.setState({currentMode: newMode});

        if(invoiceId !== undefined) {
            this.setState({invoiceId: invoiceId});
        }
    }

    // render component on the page
    render() {
        let filteredProducts = this.state.invoices;
       // let modeComponent = <ProductTableComponent products={filteredProducts} changeProductMode={this.changeProductMode} />;
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
            <div className='overflow-hidden'>
                Helloy
            </div>
        );
    }

}

export default ReadInvoicesComponent;