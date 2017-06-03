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
                   
                                <input type='number' placeholder="Number" className='' value={this.state.number}
                                       required onChange={this.onNumberChange} />
                         
                                <input type='text' placeholder="Name" className='' value={this.state.name}
                                          required onChange={this.onNameChange} />
                      
                                <input type='text'  placeholder="Email" className='' value={this.state.email}
                                       required onChange={this.onEmailChange}/>
                    
                                <input type='text' placeholder="Address" className='' value={this.state.address}
                                       required onChange={this.onAddressChange} />
              
                                <input type='text' placeholder="Zip" className='' value={this.state.postcode}
                                          required onChange={this.onPostcodeChange} />
                  
                                <input type='text' placeholder="City" className='' value={this.state.city}
                                       required onChange={this.onCityChange}/>
                   
                                <input type='text' placeholder="Country" className='' value={this.state.country}
                                       required onChange={this.onCountryChange}/>
                        
                                <input type='number' placeholder="CVR" className='' value={this.state.cvr}
                                       required onChange={this.onCvrChange}/>
                            
                                <button className='' onClick={this.onSave}>Save Changes</button>
                  
                </form>
            </div>
        );
    }
}

export default CreateCustomerComponent;
