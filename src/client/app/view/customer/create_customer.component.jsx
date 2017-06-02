import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

class CreateCustomerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            description: '',
            price: '',
            email: '',
            address: '',
            postcode: '',
            city: '',
            country: '',
            cvr: 0,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onCvrChange = this.onCvrChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNumberChange(e){
        this.setState({number: e.target.value});
    }

    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onEmailChange(e){
        this.setState({email: e.target.value});
    }

    onAddressChange(e){
        this.setState({address: e.target.value});
    }

    onPostcodeChange(e){
        this.setState({postcode: e.target.value});
    }

    onCityChange(e){
        this.setState({city: e.target.value});
    }

    onCountryChange(e){
        this.setState({country: e.target.value});
    }

    onCvrChange(e){
        this.setState({cvr: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.country,
            cvr: this.state.cvr
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/customer/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({email: ""});
                this.setState({address: ""});
                this.setState({postcode: ""});
                this.setState({city: ""});
                this.setState({country: ""});
                this.setState({cvr: 0});
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

                <a href='#' onClick={() => this.props.changeCustomerMode('read')}> Back
                </a>
                </form>
            </div>
        );
    }
}

export default CreateCustomerComponent;