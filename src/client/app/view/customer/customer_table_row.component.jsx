import React from 'react';

class CustomerTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.customer.Number}</td>
                <td>{this.props.customer.Name}</td>
                <td>{this.props.customer.SalesPrice} kr</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeCustomerMode('readOne', this.props.customer.Number)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeCustomerMode('update', this.props.customer.Number)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeCustomerMode('delete', this.props.customer.Number)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default CustomerTableRowComponent;