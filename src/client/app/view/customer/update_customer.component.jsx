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
            <div>
                {
                    this.state.successUpdate == "Customer was updated." ?
                        <div className=''>Customer was updated.</div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update customer." ?
                        <div className=''>Unable to update customer. Please try again.</div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeCustomerMode('read')} className=''>
                    Back
                </a>

                <form onSubmit={this.onSave}>
                    <table className=''>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='number' className='' value={this.state.number}
                                           readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                <input type='text' className='' value={this.state.name}
                                    required onChange={this.onNameChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type='text' className='' value={this.state.email}
                                        required onChange={this.onEmailChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input type='text' className='' value={this.state.address}
                                           required onChange={this.onAddressChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Zip</td>
                                <td>
                                <input type='text' className='' value={this.state.postcode}
                                          required onChange={this.onPostcodeChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>
                                    <input type='text' className='' value={this.state.city}
                                           required onChange={this.onCityChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>
                                    <input type='text' className='' value={this.state.country}
                                           required onChange={this.onCountryChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>CVR</td>
                                <td>
                                    <input type='number' className='' value={this.state.cvr}
                                           required onChange={this.onCvrChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className='' onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default UpdateCustomerComponent;