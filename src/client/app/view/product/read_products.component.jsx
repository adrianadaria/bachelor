import React from 'react';
import $ from 'jquery';

import ProductTopBarComponent  from './product_top_bar.component.jsx';
import ProductTableComponent from './product_table.component.jsx';

import ReadOneProductComponent from './read_one_product.component.jsx';
import CreateProductComponent  from './create_product.component.jsx';
import UpdateProductComponent  from './update_product.component.jsx';
import DeleteProductComponent  from './delete_product.component.jsx';

class ReadProductsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            productId: null,
            products: []
        }

        this.changeProductMode = this.changeProductMode.bind(this);
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.serverRequest = $.get("http://localhost/api/product/read.php", (products) => {
                this.setState({
                    products: products
                });
        });
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeProductMode(newMode, productId) {
        this.setState({currentMode: newMode});

        if(productId !== undefined) {
            this.setState({productId: productId});
        }
    }

    // render component on the page
    render() {
        let topBar = <ProductTopBarComponent changeProductMode={this.changeProductMode} />;
        let filteredProducts = this.state.products;
        let modeComponent = <ProductTableComponent products={filteredProducts} changeProductMode={this.changeProductMode} />;
        $('.page-header h1').text('Read Products');
        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                topBar = null;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeProductMode={this.changeProductMode}/>;
                topBar = null;
                break;
            case 'update':
                modeComponent =
                    <UpdateProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                topBar = null;
                break;
            case 'delete':
                modeComponent =
                    <DeleteProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                topBar = null;
                break;
            default:
                break;
        }
        //console.log(filteredProducts);
        return (
            //if current mode read render tobar
            <div className='overflow-hidden'>
                {topBar}
                {modeComponent}
            </div>
        );
    }

}

export default ReadProductsComponent;