import React from 'react';

class CustomerTopBarComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeCustomerMode('detail')}
                   className='btn btn-primary margin-bottom-1em'> Details
                </a>
                <a href='#'
                   onClick={() => this.props.changeCustomerMode('read')}
                   className='btn btn-primary margin-bottom-1em'> CusTable
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}
                   className='btn btn-primary margin-bottom-1em'> refresh
                </a>
                <a href='#'
                   onClick={() => this.props.makeInvoices()}
                   className='btn btn-primary margin-bottom-1em'> Generate Invoices
                </a>
                <a href='#'
                   onClick={() => this.props.makeOrders()}
                   className='btn btn-primary margin-bottom-1em'> Generate Orders
                </a>
            </div>
        );
    }
}

export default CustomerTopBarComponent;