import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import style from './sass/home_page.scss';
import CountTo from 'react-count-to';
import {Doughnut} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Bubble} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';


//import ProductTopBarComponent from './product/product_top_bar.component.jsx';
//

class HomePageComponent extends React.Component {

  constructor(props) {
    super(props);
  }
 componentDidMount() {
    this.myChart = this.refs['canvas'].getChart();
    this.myChart.data.datasets[0].points[2] = 50;
    this.myChart.update();
  }
  render() {

    const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};
const bubb = {
  labels: ['January'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{x:10,y:20,r:5}]
    }
  ]
};

    return (

<div className="container">
          <a href='#' onClick={() => this.props.changeAppMode('read')}>
            <div className="shadow box box-product">
              <div className="title">
                <h1>Products</h1><div className="circle yellow"/>
              </div>
              <div className="container-data">
                <div className="left">
                    <div className="container-data">
                      <div className="left">
                          <h2 className="yellow-color"><CountTo to={1234} speed={1000} /></h2>
                      </div>
                      <div className="right margin-top">
                        <div className="triangle-up"/>
                          <h4 className="yellow-color margin-zero">Pr</h4>
                      </div>
                    </div>
                  <h3 className="container-data">ADDED</h3>
                </div>
                <div className="right">
                       <div className="container-data">
                      <div className="left">
                          <h2 className="yellow-color"><CountTo to={3788} speed={1000} /></h2>
                      </div>
                      <div className="right margin-top">
                        <div className="triangle-down"/>
                          <h4 className="yellow-color margin-zero">Pr</h4>
                      </div>
                      </div>
                  <h3 className="container-data">LEFT</h3>
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
                <Line data={data} />
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
                <div className="container-data">
                      <div className="left">
                  <h2 className="blue-color"><CountTo to={1782} speed={1000} /></h2>
                </div>
                <div className="right margin-top">
                        <div className="triangle-up"/>
                          <h4 className="yellow-color margin-zero">In</h4>
                      </div>
                </div>
                  <h3>PENDING</h3>
                </div>
                <div className="right">
                <div className="container-data">
                      <div className="left">
                  <h2 className="blue-color"><CountTo to={1176} speed={1000} /></h2>
                  </div>
                                        <div className="right margin-top">
                        <div className="triangle-down"/>
                          <h4 className="yellow-color margin-zero">In</h4>
                      </div>
                      </div>
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
          <div className="container-data">
            <div className="left">
              <h2 className="dark-purple-color special"><CountTo to={17843} speed={1000} /></h2>
            </div>
            <div className="right-active">
              <h2 className="dark-purple-color">Active</h2>
            </div>
          </div>
        </div>
        <div className="category">
         <h3 className="account_title">ACCOUNTS</h3>
         </div>
    </div>
  </a>
          <a href='#' onClick={() => this.props.changeAppMode('order')}>
            <div className="box box-order">
              <div className="title">
                <h1>Orders</h1><div className="circle light-red"/>
                <Bubble data={bubb} />
              </div>
            </div>
          </a>
          <a href='#' onClick={() => this.props.changeAppMode('group')}>
            <div className="shadow box box-group">
              <div className="title">
                <h1>Groups</h1><div className="circle dark-green"/>
              </div>
              <div className="container-data">
         <Pie data={data} />
              </div>
            </div>
          </a>
          

</div>

    );
  }

}

export default HomePageComponent;