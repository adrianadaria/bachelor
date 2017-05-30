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
                ? <div className='alert alert-danger'>No accounts found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Card</th>
                        <th>Vat</th>
                        <th>Balance</th>
                        <th>Action</th>
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