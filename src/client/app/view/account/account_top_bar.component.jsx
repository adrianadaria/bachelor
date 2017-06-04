import React from 'react';

class AccountTopBarComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.refresh()}>
                   <div className="refresh"/>
                </a>
            </div>
        );
    }
}

export default AccountTopBarComponent;