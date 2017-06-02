import React from 'react';

class AccountTopBarComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeAccountMode('create')}
                   className='btn btn-primary margin-bottom-1em'> Create account
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}
                   className='btn btn-primary margin-bottom-1em'> refresh
                </a>
            </div>
        );
    }
}

export default AccountTopBarComponent;