import React from 'react';
import $ from 'jquery';

//import ProductTopBarComponent from './product/product_top_bar.component.jsx';

class HomePageComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      $('.page-header h1').text('E-conomic API Early Release');
  }

  render() {
    return (
        <div>
            <a href='#'
               onClick={() => this.props.changeAppMode('read')}
               className='btn btn-info m-r-1em'> Products
            </a>
            <a href='#'
               onClick={() => this.props.changeAppMode('customer')}
               className='btn btn-info m-r-1em'> Customers
            </a>
            <a href='#'
               onClick={() => this.props.changeAppMode('invoice')}
               className='btn btn-info m-r-1em'> Invoices
            </a>
        </div>
    );
  }

}

export default HomePageComponent;