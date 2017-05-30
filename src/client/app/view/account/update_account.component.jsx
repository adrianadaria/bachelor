import React from 'react';
import $ from 'jquery';

class UpdateAccountComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            type: '',
            card: '',
            vat: '',
            balance: 0.00,
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onCardChange = this.onCardChange.bind(this);
        this.onVatChange = this.onVatChange.bind(this);
        this.onBalanceChange = this.onBalanceChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        // read one product data
        let accountNo = this.props.accountNo;
        this.serverRequestProd = $.get("http://localhost/api/account/read_one.php?number=" + accountNo,
            (account) => {
                this.setState({number: account.number});
                this.setState({name: account.name});
                this.setState({type: account.type});
                this.setState({card: account.card});
                this.setState({vat: account.vat});
                this.setState({balance: account.balance});
            });

        $('.page-header h1').text('Update account');
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    // handle name change

    // handle description change
    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onTypeChange(e){
        this.setState({type: e.target.value});
    }

    onCardChange(e){
        this.setState({card: e.target.value});
    }

    // handle price change
    onVatChange(e){
        this.setState({vat: e.target.value});
    }

    onBalanceChange(e){
        this.setState({balance: e.target.value});
    }

    // handle save changes button clicked
    onSave(e){
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
            url: "http://localhost/api/account/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successUpdate: response['message']});
                setTimeout(() => {
                    this.props.changeAccountMode('read');
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
                    this.state.successUpdate == "Account was updated." ?
                        <div className='alert alert-success'>Account was updated.</div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update account." ?
                        <div className='alert alert-danger'>Unable to update account. Please try again.</div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAccountMode('read')} className='btn btn-primary margin-bottom-1em'>
                    Read Accounts
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.number} readOnly/>
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
                                <td>Type</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.type}
                                        required onChange={this.onTypeChange}/>
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
                                <td>Balance</td>
                                <td>
                                    <input type='number' step='0.01' className='form-control' value={this.state.balance}
                                           required onChange={this.onBalanceChange} readOnly/>
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

export default UpdateAccountComponent;