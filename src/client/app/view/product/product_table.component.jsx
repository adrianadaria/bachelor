import React from 'react';

import ProductTableRowComponent from './product_table_row.component.jsx';

class ProductTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.products.map(function(product, i) {
            return (
                <ProductTableRowComponent key={i} product={product} changeProductMode={this.props.changeProductMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <div className='alert alert-danger'>No products found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Group</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default ProductTableComponent;