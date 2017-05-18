import React from 'react';

class ProductTopBarComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeProductMode('create')}
                   className='btn btn-primary margin-bottom-1em'> Create product
                </a>
            </div>
        );
    }
}

export default ProductTopBarComponent;