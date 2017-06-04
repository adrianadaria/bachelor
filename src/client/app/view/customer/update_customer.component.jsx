import React from 'react';
import $ from 'jquery';

class UpdateCustomerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            email: '',
            address: '',
            postcode: '',
            city: '',
            country: '',
            cvr: 0,
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onCvrChange = this.onCvrChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        let cusNo = this.props.cusNo;
        this.serverRequestProd = $.get("http://localhost/api/customer/read_one.php?number=" + cusNo,
            (customer) => {
                this.setState({number: customer.number});
                this.setState({name: customer.name});
                this.setState({email: customer.email});
                this.setState({address: customer.address});
                this.setState({postcode: customer.postcode});
                this.setState({city: customer.city});
                this.setState({country: customer.country});
                this.setState({cvr: customer.cvr});
            });
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
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

    // handle save changes button clicked
    onSave(e){
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
            url: "http://localhost/api/customer/update.php",
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
            <div className="form_style">
                {
                    this.state.successUpdate == "Customer was updated." ?
                        <div className="msg_success"><h4>Customer was updated</h4></div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update customer." ?
                        <div className="msg_fail"><h4>Unable to update customer. Please try again</h4></div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeCustomerMode('read')}>
                    <div className="back"/>
                </a>

                <form onSubmit={this.onSave} className="update_form">
                    <h4 className="table_title">UPDATE</h4>
                    <h4 className="table_title">THIS CUSTOMER</h4>
                        <label><h5>Number</h5></label>
                        <input type='number' className='' value={this.state.number} readOnly/>
                        <label><h5>Name</h5></label>
                        <input type='text' className='' value={this.state.name} required onChange={this.onNameChange} />
                        <label><h5>Email</h5></label>
                        <input type='text' className='' value={this.state.email} required onChange={this.onEmailChange}/>
                        <label><h5>Address</h5></label>
                        <input type='text' className='' value={this.state.address} required onChange={this.onAddressChange} />
                        <label><h5>Zip</h5></label>
                        <input type='text' className='' value={this.state.postcode} required onChange={this.onPostcodeChange} />
                        <label><h5>City</h5></label>
                        <input type='text' className='' value={this.state.city} required onChange={this.onCityChange}/>
                        <label><h5>Country</h5></label>
                        <input type='text' className='' value={this.state.country} required onChange={this.onCountryChange}/>
                        <label><h5>CVR</h5></label>
                        <input type='number' className='' value={this.state.cvr} required onChange={this.onCvrChange}/>
                        <input type="submit" value="Update" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default UpdateCustomerComponent;