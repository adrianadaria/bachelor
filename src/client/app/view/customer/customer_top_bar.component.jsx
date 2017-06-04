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
                   className="btn_default"> Details
                </a>
                <a href='#'
                   onClick={() => this.props.changeCustomerMode('read')}
                   className="btn_default"> Customers
                </a>
                <a href='#'onClick={() => this.props.refresh()}>
                  <div className="refresh"/>
                </a>
                <a href='#'
                   onClick={() => this.props.makeInvoices()}
                   className="btn_default"> Generate Invoices
                </a>
                <a href='#'
                   onClick={() => this.props.makeOrders()}
                   className="btn_default"> Generate Orders
                </a>
            </div>
        );
    }
}

export default CustomerTopBarComponent;