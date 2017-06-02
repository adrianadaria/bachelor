import React from 'react';
import $ from 'jquery';

class ReadOneProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            group: 0,
            price: 0
        };
    }

    // on mount, read product data and them as this component's state
    componentDidMount() {
        let productNo = this.props.productNo;

        this.serverRequestProd = $.get("http://localhost/api/product/read_one.php?number=" + productNo,
             (product) => {
                this.setState({number: product.number});
                this.setState({name: product.name});
                this.setState({group: product.group});
                this.setState({price: product.price});
             });
    }

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeProductMode('read')}
                   className='btn btn-primary margin-bottom-1em'>Read Products
                </a>
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Number</td>
                            <td>{this.state.number}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Price (DKK)</td>
                            <td>{parseFloat(this.state.price).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Group</td>
                            <td>{this.state.group}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneProductComponent;