import React from 'react';
import $ from 'jquery';

class ReadOneProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            description: '',
            price: 0.00
        };

        this.onSave = this.onSave.bind(this);
    }

    // on mount, read product data and them as this component's state
    componentDidMount() {
        let productId = this.props.productId;

        this.serverRequestProd = $.get("http://localhost/api/product/read_one.php?id=" + productId,
             (product) => {
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({description: product.description});
                this.setState({price: product.price});
             });

        $('.page-header h1').text('Read Product');
    }

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    onSave() {}

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'>Read Products
                </a>
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{this.state.description}</td>
                        </tr>
                        <tr>
                            <td>Price (DKK)</td>
                            <td>{parseFloat(this.state.price).toFixed(2)} kr</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneProductComponent;