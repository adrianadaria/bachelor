import React from 'react';
import $ from 'jquery';

class CreateAccountComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            name: '',
            type: '',
            card: '',
            vat: '',
            balance: '',
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
                        <div className="msg_success">
                            <h4>Account was saved</h4>
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create account." ?
                        <div className="msg_fail">
                            <h4>Unable to save account. Please try again</h4>
                        </div>
                        : null
                }

                <a href='#' onClick={() => this.props.changeAccountMode('read')}>
                    <div className="back"/>
                </a>

                <h4 className="title_right_col">CREATE A</h4>
                <h4 className="title_right_col">NEW ACCOUNT</h4>

                <form onSubmit={this.onSave}>
                    <input type='number' placeholder="Number" className='form-control' value={this.state.number}
                                           required onChange={this.onNumberChange} />
                    <input type='text' placeholder="Name" value={this.state.name}
                                        required onChange={this.onNameChange} />
                    <input type='text' placeholder="Type" value={this.state.type}
                                           required onChange={this.onTypeChange} readOnly/>
                    <input type='text' placeholder="Card" value={this.state.card}
                                           required onChange={this.onCardChange}/>
                    <input type='text' placeholder="Vat" value={this.state.vat}
                                           required onChange={this.onVatChange}/>
                    <input type='number' placeholder="Balance (DKK)" step="0.01" value={parseFloat(this.state.balance).toFixed(2)}
                                            required onChange={this.onBalanceChange} readOnly/>
                    <input type="submit" value="Save" onClick={this.onSave}/>  
                </form>
            </div>
        );
    }
}

export default CreateAccountComponent;