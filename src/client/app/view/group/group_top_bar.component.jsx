import React from 'react';

class GroupTopBarComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeGroupMode('readp')}
                   className="btn_default"> Product Group
                </a>
                <a href='#'
                   onClick={() => this.props.changeGroupMode('readc')}
                   className="btn_default"> Customer Group
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}>
                   <div className="refresh"/>
                </a>
            </div>
        );
    }
}

export default GroupTopBarComponent;