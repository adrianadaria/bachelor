import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

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
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
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
                //setTimeout(() => {
                //    this.props.changeProductMode('read');
                //}, 1500);
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
            <div className="form_style">
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
                   onClick={() => this.props.changeProductMode('read')} alt="Read Products">
                    <div className="back"></div>
                </a>

                <form onSubmit={this.onSave}>
                    <h4 className="title_right_col">UPDATE</h4>
                    <h4 className="title_right_col">THIS PRODUCT</h4>
                                <label>Number</label>
                                    <input type="text" value={this.state.number}
                                        required readOnly/>
                                 <label>Name</label>
                                <input type="text" value={this.state.name}
                                    required onChange={this.onNameChange} />
                                 <label>Price (DKK)</label>
                                    <input type="number" step="0.01" value={this.state.price}
                                        required onChange={this.onPriceChange}/>
                                <label>Group</label>
                                    <input type="number" className='form-control' value={this.state.group}
                                           required onChange={this.onGroupChange}/>
                                <input type="submit" value="Update" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default UpdateProductComponent;