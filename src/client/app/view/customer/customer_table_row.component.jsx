import React from 'react';

class CustomerTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.customer.number}</td>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                <td>{this.props.customer.address}</td>
                <td>{this.props.customer.postcode}</td>
                <td>{this.props.customer.city}</td>
                <td>{this.props.customer.country}</td>
                <td>{this.props.customer.cvr}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeCustomerMode('readOne', this.props.customer.number)}>
                       <div className="action_btn view"/>
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeCustomerMode('update', this.props.customer.number)}>
                       <div className="action_btn edit"/>
                    </a>
                    <a href='#'
                        onClick={() => this.props.changeCustomerMode('delete', this.props.customer.number)}>
                        <div className="action_btn delete"/>
                    </a>
                </td>
            </tr>
        );
    }

}

export default CustomerTableRowComponent;