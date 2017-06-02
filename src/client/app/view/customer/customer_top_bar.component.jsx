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
                   className='btn btn-primary margin-bottom-1em'> Table
                </a>
                <a href='#'
                   onClick={() => this.props.changeCustomerMode('create')}
                   className='btn btn-primary margin-bottom-1em'> Create customer
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}
                   className='btn btn-primary margin-bottom-1em'> refresh
                </a>
            </div>
        );
    }
}

export default CustomerTopBarComponent;