import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import style from './sass/home_page.scss';

//import ProductTopBarComponent from './product/product_top_bar.component.jsx';

class HomePageComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
<div className="container">

          <a href='#' onClick={() => this.props.changeAppMode('read')}>
            <div className="shadow box box-product">
              <div className="title">
                <h1>Products</h1><div className="circle red"/>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('customer')}>
            <div className="box box-customer">
              <div className="title">
                <h1>Customers</h1><div className="circle light-blue"/>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('invoice')}>
            <div className="shadow box box-invoice">
              <div className="title">
              <h1>Invoices</h1><div className="circle purple"/>
              </div>
            </div>
          </a>


          <a href='#' onClick={() => this.props.changeAppMode('account')}>
            <div className="box box-account">
              <div className="title">
                <h1>Accounts</h1><div className="circle green"/>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('group')}>
            <div className="shadow box box-group">
              <div className="title">
                <h1>Groups</h1><div className="circle yellow"/>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('order')}>
            <div className="box box-order">
              <div className="title">
                <h1>Orders</h1><div className="circle dark-blue"/>
              </div>
            </div>
          </a>

</div>

    );
  }

}

export default HomePageComponent;