import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

class CreateProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        $('.page-header h1').text('Create product');
    }

    // handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }

    // handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    // handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            name: this.state.name,
            description: this.state.description,
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
                this.setState({name: ""});
                this.setState({description: ""});
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
            <div className="form_style">
                {

                    this.state.successCreation == "Customer was created." ?
                        <h4>CUSTOMER WAS SAVED</h4>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create customer." ?
                        <div>
                            <h4>UNABLE TO CREATE CUSTOMER</h4>
                            <h4>PLEASE TRY AGAIN</h4>
                        </div>
                        : null
                }
                    <h4 className="title_right_col">CREATE A</h4>
                    <h4 className="title_right_col">NEW CUSTOMER</h4>
                <form onSubmit={this.onSave}>
                    <input type="text" placeholder="Name" value={this.state.name} required onChange={this.onNameChange} />
                    <textarea type="text" placeholder="Description" value={this.state.description}
                                            required onChange={this.onDescriptionChange}>
                                    </textarea>
                    <input type="number" placeholder="Price (DKK)" step='0.01' min="0" value={this.state.price} required onChange={this.onPriceChange} />
                    <input type="submit" value="Save" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default CreateProductComponent;