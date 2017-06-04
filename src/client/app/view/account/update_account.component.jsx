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
        // read one account data
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
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
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

    // handle save changes button clicked
    onSave(e){
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            type: this.state.type,
            card: this.state.card,
            vat: this.state.vat,
            balance: this.state.balance
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
                        <div className="msg_success"><h4>Account was updated</h4></div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update account." ?
                        <div className="msg_fail"><h4>Unable to update account. Please try again</h4></div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAccountMode('read')}>
                   <div className="back"/>
                </a>

                <form onSubmit={this.onSave} className="update_form">
                    <h4 className="table_title">UPDATE</h4>
                    <h4 className="table_title">THIS ACCOUNT</h4>
                                <label><h5>Number</h5></label>
                                <input type='number' value={this.state.number} readOnly/>
                                <label><h5>Name</h5></label>
                                <input type='text' value={this.state.name}
                                    required onChange={this.onNameChange}/>
                                <label><h5>Type</h5></label>
                                <input type='text' value={this.state.type}
                                        required onChange={this.onTypeChange}/>
                                <label><h5>Card</h5></label>
                                <input type='text' value={this.state.card}
                                           required onChange={this.onCardChange}/>
                                <label><h5>Vat</h5></label>
                                <input type='text' className='form-control' value={this.state.vat}
                                           required onChange={this.onVatChange}/>
                                <label><h5>Balance</h5></label>
                                <input type='number' value={parseFloat(this.state.balance).toFixed(2)}
                                           required onChange={this.onBalanceChange} readOnly/>
                                <input type="submit" value="Update" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default UpdateAccountComponent;
