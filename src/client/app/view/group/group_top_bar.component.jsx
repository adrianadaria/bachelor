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
                   className='btn btn-primary margin-bottom-1em'> ProductG
                </a>
                <a href='#'
                   onClick={() => this.props.changeGroupMode('readc')}
                   className='btn btn-primary margin-bottom-1em'> CustomerG
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}
                   className='btn btn-primary margin-bottom-1em'> refresh
                </a>
            </div>
        );
    }
}

export default GroupTopBarComponent;