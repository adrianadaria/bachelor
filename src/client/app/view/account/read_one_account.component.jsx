import React from 'react';
import $ from 'jquery';

class ReadOneAccountComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            type: '',
            card: '',
            vat: '',
            balance: 0.00
        };

        this.onSave = this.onSave.bind(this);
    }

    // on mount, read product data and them as this component's state
    componentDidMount() {
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

        $('.page-header h1').text('Read Account');
    }

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    onSave() {}

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeAccountMode('read')}
                   className='btn btn-primary margin-bottom-1em'>Read Accounts
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table_list">
                        <caption><h4 className="table_title">DETAILS OF</h4>
                    <h4 className="table_title">THE ACCOUNT</h4></caption>
                        <tbody>
                        <tr>
                            <td>Number</td>
                            <td>{this.state.number}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{this.state.type}</td>
                        </tr>
                        <tr>
                            <td>Card</td>
                            <td>{this.state.card}</td>
                        </tr>
                        <tr>
                            <td>Vat</td>
                            <td>{this.state.vat}</td>
                        </tr>
                        <tr>
                            <td>Balance</td>
                            <td>{parseFloat(this.state.balance).toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneAccountComponent;