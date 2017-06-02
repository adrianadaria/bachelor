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
    }

    // on mount, read account data and them as this component's state
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
    }

    // on unmount, kill account fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeAccountMode('read')}
                   className='btn btn-primary margin-bottom-1em'>Read Accounts
                </a>
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
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