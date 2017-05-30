import React from 'react';

class OrderTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.order.id}</td>
                <td>{this.props.order.cusName}</td>
                <td>{this.props.order.date}</td>
                <td>{this.props.order.delAddress}</td>
                <td>{this.props.order.delZip}</td>
                <td>{this.props.order.delCity}</td>
                <td>{this.props.order.delCountry}</td>
                <td>{this.props.order.delTerms}</td>
                <td>{this.props.order.delDate}</td>
                <td>{this.props.order.total}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeOrderMode('readOne', this.props.order.id)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeOrderMode('update', this.props.order.id)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeOrderMode('delete', this.props.order.id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default OrderTableRowComponent;