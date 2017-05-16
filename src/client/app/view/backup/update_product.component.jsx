import React from 'react';
import $ from 'jquery';

class UpdateProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            description: '',
            price: 0.00,
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        // read one product data
        var productId = this.props.productId;
        this.serverRequestProd = $.get("http://localhost/api/product/read_one.php?id=" + productId,
            (product) => {
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({description: product.description});
                this.setState({price: product.price});
            });

        $('.page-header h1').text('Update product');
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    // handle name change
    onNameChange(e){
        this.setState({name: e.target.value});
    }
    // handle description change
    onDescriptionChange(e){
        this.setState({description: e.target.value});
    }
    // handle price change
    onPriceChange(e){
        this.setState({price: e.target.value});
    }

    // handle save changes button clicked
    onSave(e){
        // data in the form
        let form_data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
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
                   onClick={() => this.props.changeAppMode('read')} className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.name}
                                        required onChange={this.onNameChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                <textarea type='text' className='form-control' value={this.state.description}
                                    required onChange={this.onDescriptionChange}></textarea>
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