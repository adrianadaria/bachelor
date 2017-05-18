import React from 'react';
import $ from 'jquery';
import style from './sass/home_page.scss';

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
        <div className="container">
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('read')}>
                <div className="box-product">
                  <h1>Products</h1>
                </div>
              </a>
            </div>
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('customer')}>
                <div className="box-customer">
                  <h1>Customers</h1>
                </div>
              </a>
            </div>
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('invoice')}>
                <div className="box-invoice">
                  <h1>Invoices</h1>
                </div>
              </a>
            </div>
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('account')}>
                <div className="box-account">
                  <h1>Accounts</h1>
                </div>
              </a>
            </div>
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('group')}>
                <div className="box-group">
                  <h1>Groups</h1>
                </div>
              </a>
            </div>
            <div>
              <a href='#' onClick={() => this.props.changeAppMode('order')}>
                <div className="box-order">
                  <h1>Orders</h1>
                </div>
              </a>
            </div>
        </div>
    );
  }

}

export default HomePageComponent;