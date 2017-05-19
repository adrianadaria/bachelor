import React from 'react';
import $ from 'jquery';

class UpdateProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            group: 0,
            price: 0,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        // read one product data
        var productNo = this.props.productNo;
        this.serverRequestProd = $.get("http://localhost/api/product/read_one.php?number=" + productNo,
            (product) => {
                this.setState({number: product.number});
                this.setState({name: product.name});
                this.setState({group: product.group});
                this.setState({price: product.price});
            });

        $('.page-header h1').text('Update product');
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    // handle name change
    onNumberChange(e){
        this.setState({number: e.target.value});
    }
    // handle description change
    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onGroupChange(e){
        this.setState({group: e.target.value});
    }

    // handle price change
    onPriceChange(e){
        this.setState({price: e.target.value});
    }

    // handle save changes button clicked
    onSave(e){
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            group: this.state.group,
            price: this.state.price
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/product/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successUpdate: response['message']});
                setTimeout(() => {
                    this.props.changeProductMode('read');
                }, 1500);
            },
            error: (xhr, resp, text) => {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    }

    render() {
        return (
            <div>
                {
                    this.state.successUpdate == "Product was updated." ?
                        <div className='alert alert-success'>Product was updated.</div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update product." ?
                        <div className='alert alert-danger'>Unable to update product. Please try again.</div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeProductMode('read')} className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.number}
                                        required onChange={this.onNumberChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                <textarea type='text' className='form-control' value={this.state.name}
                                    required onChange={this.onNameChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Price (DKK)</td>
                                <td>
                                    <input type='number' step="0.01" className='form-control' value={this.state.price}
                                        required onChange={this.onPriceChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Group</td>
                                <td>
                                    <input type='number' step="0.01" className='form-control' value={this.state.group}
                                           required onChange={this.onGroupChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className='btn btn-primary' onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default UpdateProductComponent;