import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

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
            productNo: null,
            products: []
        };

        this.changeProductMode = this.changeProductMode.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    fetchProducts() {
        this.serverRequest = $.get("http://localhost/api/product/read.php", (products) => {
            this.setState({
                products: products.records
            });
        });
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchProducts();
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeProductMode(newMode, productNo) {
        this.setState({currentMode: newMode});

        if(productNo !== undefined) {
            this.setState({productNo: productNo});
        }
    }

    // render component on the page
    render() {
        let filteredProducts = this.state.products;
        let modeComponent = <ProductTableComponent products={filteredProducts} changeProductMode={this.changeProductMode} />;

        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneProductComponent productNo={this.state.productNo} changeProductMode={this.changeProductMode}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeProductMode={this.changeProductMode}/>;
                break;
            case 'update':
                modeComponent =
                    <UpdateProductComponent productNo={this.state.productNo} changeProductMode={this.changeProductMode}/>;
                break;
            case 'delete':
                modeComponent =
                    <DeleteProductComponent productNo={this.state.productNo} changeProductMode={this.changeProductMode}/>;
                break;
            default:
                break;
        }

        return (


            <div className="container equal">
                <div className="col-left bg-light-grey left-typo scroll">
                    {
                        this.state.currentMode == 'read' ?
                            <a href='#' onClick={() => this.fetchProducts()}>
                                <div className="refresh"/>
                            </a>
                                :
                            null
                    }
                    {modeComponent}
                </div>
                <div className="col-right bg-yellow">
                    <CreateProductComponent />
                </div>
            </div>

        );
    }

}

export default ReadProductsComponent;