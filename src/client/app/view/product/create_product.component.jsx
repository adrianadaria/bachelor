import React from 'react';
import $ from 'jquery';

class CreateProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            name: '',
            group: 0,
            price: 0.00,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        $('.page-header h1').text('Create product');
    }

    onNumberChange(e) {
        this.setState({number: e.target.value});
    }

    // handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    // handle description change
    onGroupChange(e) {
        this.setState({group: e.target.value});
    }

    // handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            group: this.state.group,
            price: this.state.price
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/product/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: ""});
                this.setState({name: ""});
                this.setState({group: ""});
                this.setState({price: ""});
            },
            error: (xhr, resp, text) => {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    }

    render() {
        /*
         - tell the user if a product was created
         - tell the user if unable to create product
         - button to go back to products list
         - form to create a product
         */
        return (
            <div>
                {

                    this.state.successCreation == "Product was created." ?
                        <div className='alert alert-success'>
                            Product was saved.
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create product." ?
                        <div className='alert alert-danger'>
                            Unable to save product. Please try again.
                        </div>
                        : null
                }

                <a href='#' onClick={() => this.props.changeProductMode('read')}
                   className='btn btn-primary margin-bottom-1em'> Read Products
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
                                    <input type='text' className='form-control' value={this.state.name}
                                        required onChange={this.onNameChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Price (DKK)</td>
                                <td>
                                    <textarea type='number' step="0.01" className='form-control' value={this.state.price}
                                            required onChange={this.onPriceChange}>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Group</td>
                                <td>
                                    <input type='number' step='0' className='form-control' value={this.state.group}
                                           required onChange={this.onGroupChange} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className='btn btn-primary' onClick={this.onSave}>Save</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default CreateProductComponent;