import React from 'react';
import $ from 'jquery';

import ProductTopBarComponent  from './product_top_bar.component.jsx';
import ProductTableComponent from './product_table.component.jsx';

class ReadProductsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.serverRequest = $.get("http://localhost/api/product/read.php", (products) => {
                this.setState({
                    products: products.records
                });
        });

        $('.page-header h1').text('Read Products');
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    // render component on the page
    render() {
        // list of products
        let filteredProducts = this.state.products;
        return (
            <div className='overflow-hidden'>
                <ProductTopBarComponent changeAppMode={this.props.changeAppMode} />
                <ProductTableComponent products={filteredProducts} changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }

}

export default ReadProductsComponent;