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
                       onClick={() => this.props.changeAccountMode('readOne', this.props.account.number)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeAccountMode('update', this.props.account.number)}
                       className='btn btn-info m-r-1em'> Edit
                    </a>
                    <a  href='#'
                        onClick={() => this.props.changeAccountMode('delete', this.props.account.number)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default AccountTableRowComponent;