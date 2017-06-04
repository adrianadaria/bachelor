import React from 'react';
import ProductTableRowComponent from './product_table_row.component.jsx';
import style from '../sass/subpage.scss';

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
                ?  <h4>NO PRODUCTS FOUND</h4>
                :
                <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">PRODUCTS</h4></caption>
                    <thead>
                    <tr>
                        <th><h5>Number</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>Price</h5></th>
                        <th><h5>Group</h5></th>
                        <th className="extra_width"><h5>Action</h5></th>
                    </tr>
                    </thead>
                    <tbody className="table_product">
                        {rows}
                    </tbody>
                </table>
        );
    }
}

export default ProductTableComponent;