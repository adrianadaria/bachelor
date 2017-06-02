import React from 'react';

import AccountTableRowComponent from './account_table_row.component.jsx';

class AccountTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.accounts.map(function(account, i) {
            return (
                <AccountTableRowComponent key={i} account={account} changeAccountMode={this.props.changeAccountMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <h4>NO ACCOUNTS FOUND</h4>
                :
                <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">ACCOUNTS</h4></caption>
                    <thead>
                    <tr>
                        <th><h5>Number</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>Type</h5></th>
                        <th><h5>Card</h5></th>
                        <th><h5>Vat</h5></th>
                        <th><h5>Balance</h5></th>
                        <th className="extra_width"><h5>Action</h5></th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default AccountTableComponent;