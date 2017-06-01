import React from 'react';
import style from '../sass/subpage.scss';
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
                <a href='#'
                   onClick={() => this.props.refresh()}
                   className='btn btn-primary margin-bottom-1em'> refresh
                </a>
            </div>
        );
    }
}

export default ProductTopBarComponent;