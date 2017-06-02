import React from 'react';

class AccountTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.account.number}</td>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.type}</td>
                <td>{this.props.account.card}</td>
                <td>{this.props.account.vat}</td>
                <td>{this.props.account.balance}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeAccountMode('readOne', this.props.account.number)}>
                       <div className="action_btn view" />
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeAccountMode('update', this.props.account.number)}>
                       <div className="action_btn edit" />
                    </a>
                    <a  href='#'
                        onClick={() => this.props.changeAccountMode('delete', this.props.account.number)}>
                        <div className="action_btn delete" />
                    </a>
                </td>
            </tr>
        );
    }

}

export default AccountTableRowComponent;