import React from 'react';

class ProductTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.product.Number}</td>
                <td>{this.props.product.Name}</td>
                <td>{this.props.product.SalesPrice} kr</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('readOne', this.props.product.Number)}
                       className='btn btn-info m-r-1em'> Read One
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('update', this.props.product.Number)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.product.Number)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }

}

export default ProductTableRowComponent;