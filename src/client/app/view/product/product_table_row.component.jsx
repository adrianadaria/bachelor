import React from 'react';
import style from '../sass/subpage.scss';

class ProductTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.product.number}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price} kr</td>
                <td>{this.props.product.group}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeProductMode('readOne', this.props.product.number)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeProductMode('update', this.props.product.number)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeProductMode('delete', this.props.product.number)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default ProductTableRowComponent;