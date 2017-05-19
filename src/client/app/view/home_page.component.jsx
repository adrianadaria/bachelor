import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import style from './sass/home_page.scss';
import {Sankey} from 'react-vis';
//import ProductTopBarComponent from './product/product_top_bar.component.jsx';

class HomePageComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

    return (

<div className="container">
          <a href='#' onClick={() => this.props.changeAppMode('read')}>
            <div className="shadow box box-product">
              <div className="title">
                <h1>Products</h1><div className="circle yellow"/>
              </div>
              <div className="container-data">
                <div className="left">
                  <h2 className="yellow-color">22</h2>
                  <h3>ADDED</h3>
                </div>
                <div className="right">
                  <h2 className="yellow-color">15</h2>
                  <h3>LEFT</h3>
                </div>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('customer')}>
            <div className="box box-customer">
              <div className="title">
                <h1>Customers</h1><div className="circle orange"/>
              </div>
              <div className="container-data">
              <Sankey nodes={nodes} links={links} width={200} height={200} />
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('invoice')}>
            <div className="shadow box box-invoice">
              <div className="title">
              <h1>Invoices</h1><div className="circle blue"/>
              </div>
               <div className="container-data">
                <div className="left">
                  <h2 className="blue-color">15</h2>

                  <h3>PENDING</h3>
                </div>
                <div className="right">
                  <h2 className="blue-color">73</h2>
                  <h3>RESOLVED</h3>
                </div>
              </div>
            </div>
          </a>


          <a href='#' onClick={() => this.props.changeAppMode('account')}>
            <div className="box box-account">
              <div className="title">
                <h1>Accounts</h1><div className="circle dark-purple"/>
              </div>
               <div className="container-data">
                <div className="middle">
                  <h2 className="dark-purple-color">17,874</h2>
                  <h3>ACCOUNTS</h3>
                </div>
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('group')}>
            <div className="shadow box box-group">
              <div className="title">
                <h1>Groups</h1><div className="circle dark-green"/>
              </div>
              <div className="container-data">
               <Sankey nodes={nodes} links={links} width={200} height={200} />
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('order')}>
            <div className="box box-order">
              <div className="title">
                <h1>Orders</h1><div className="circle light-red"/>
              </div>
            </div>
          </a>

</div>

    );
  }

}

export default HomePageComponent;