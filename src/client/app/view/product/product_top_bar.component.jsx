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
                   onClick={() => this.props.changeProductMode('create')}> Create product
                </a>
                <a href='#'
                   onClick={() => this.props.refresh()}> refresh
                </a>
            </div>
        );
    }
}

export default ProductTopBarComponent;