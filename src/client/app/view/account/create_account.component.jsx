import React from 'react';
import $ from 'jquery';

class CreateAccountComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            type: 'ProfitAndLoss',
            card: '',
            vat: '',
            balance: 0.00,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onCardChange = this.onCardChange.bind(this);
        this.onVatChange = this.onVatChange.bind(this);
        this.onBalanceChange = this.onBalanceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNumberChange(e) {
        this.setState({number: e.target.value});
    }

    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onTypeChange(e){
        this.setState({type: e.target.value});
    }

    onCardChange(e){
        this.setState({card: e.target.value});
    }

    onVatChange(e){
        this.setState({vat: e.target.value});
    }

    onBalanceChange(e){
        this.setState({balance: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            type: this.state.type,
            card: this.state.card,
            vat: this.state.vat,
            balance: this.state.balance,
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/account/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({type: "ProfitAndLoss"});
                this.setState({card: ""});
                this.setState({vat: ""});
                this.setState({balance: 0.00});
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

                    this.state.successCreation == "Account was created." ?
                        <div className='alert alert-success'>
                            Account was saved.
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create account." ?
                        <div className='alert alert-danger'>
                            Unable to save account. Please try again.
                        </div>
                        : null
                }

                <a href='#' onClick={() => this.props.changeAccountMode('read')}
                   className='btn btn-primary margin-bottom-1em'> Read Accounts
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='number' className='form-control' value={this.state.number}
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
                                <td>Type</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.type}
                                           required onChange={this.onTypeChange} readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <td>Card</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.card}
                                           required onChange={this.onCardChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Vat</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.vat}
                                           required onChange={this.onVatChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Balance (DKK)</td>
                                <td>
                                    <input type='number' step="0.01" className='form-control' value={parseFloat(this.state.balance).toFixed(2)}
                                            required onChange={this.onBalanceChange} readOnly/>
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

export default CreateAccountComponent;