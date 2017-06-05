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
                <td>{parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.group}</td>
                <td>
                    <a href='#' onClick={() => this.props.changeProductMode('readOne', this.props.product.number)}> 
                       <div className="action_btn view" />
                    </a>
                    <a href='#' onClick={() => this.props.changeProductMode('update', this.props.product.number)}>
                        <div className="action_btn edit"/>
                    </a>
                    <a href="#" onClick={() => this.props.changeProductMode('delete', this.props.product.number)}> 
                        <div className="action_btn delete"/>
                    </a>
                </td>
            </tr>
        );
    }

}

export default ProductTableRowComponent;