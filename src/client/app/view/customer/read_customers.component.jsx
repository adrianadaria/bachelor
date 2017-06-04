import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

import CustomerTopBarComponent from './customer_top_bar.component.jsx';
import CustomerTableComponent from './customer_table.component.jsx';
import ReadOneCustomerComponent from './read_one_customer.component.jsx';
import CreateCustomerComponent from './create_customer.component.jsx';
import UpdateCustomerComponent from './update_customer.component.jsx';
import DeleteCustomerComponent from './delete_customer.component.jsx';
import CustomerDetailComponent from './customer_detail.component.jsx';

class ReadCustomersComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'detail',
            customerNo: null,
            customers: []
        };

        this.changeCustomerMode = this.changeCustomerMode.bind(this);
        this.fetchCustomers = this.fetchCustomers.bind(this);
        this.makeInvoices = this.makeInvoices.bind(this);
        this.makeOrders = this.makeOrders.bind(this);
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    fetchCustomers() {
        if(this.serverRequest) {
            this.serverRequest.abort();
        }
        this.serverRequest = $.get("http://localhost/api/customer/read.php", (customers) => {
            this.setState({
                customers: customers.records
            });
        });
    }

    makeInvoices(e) {
        let inv = 666;
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/detail/make_invoices.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify({'number' : inv}),
            success : (response) => {
                alert('Done');
            },
            error: (xhr, resp, text) => {
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    makeOrders(e) {
        let order = 666;
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/detail/make_orders.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify({'number' : order}),
            success : (response) => {
                alert('Done');
            },
            error: (xhr, resp, text) => {
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    changeCustomerMode(newMode, customerNo) {
        this.setState({currentMode: newMode});

        if(customerNo !== undefined) {
            this.setState({customerNo: customerNo});
        }
    }

    // render component on the page
    render() {
        let filteredProducts = this.state.customers;
        let modeComponent = <CustomerDetailComponent />;
        let topBar = null;

        switch(this.state.currentMode) {
            case 'detail':
                topBar = <CustomerTopBarComponent changeCustomerMode={this.changeCustomerMode}
                   refresh={this.fetchCustomers} makeInvoices={this.makeInvoices} makeOrders={this.makeOrders} />;
                break;
            case 'read':
                topBar = <CustomerTopBarComponent changeCustomerMode={this.changeCustomerMode}
                   refresh={this.fetchCustomers} makeInvoices={this.makeInvoices} makeOrders={this.makeOrders} />;
                modeComponent = <CustomerTableComponent customers={filteredProducts} changeCustomerMode={this.changeCustomerMode} />;
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneCustomerComponent cusNo={this.state.customerNo} changeCustomerMode={this.changeCustomerMode}/>;
                break;
            case 'create':
                modeComponent = <CreateCustomerComponent changeCustomerMode={this.changeCustomerMode}/>;
                break;
            case 'update':
                modeComponent =
                    <UpdateCustomerComponent cusNo={this.state.customerNo} changeCustomerMode={this.changeCustomerMode}/>;
                break;
            case 'delete':
                modeComponent =
                    <DeleteCustomerComponent cusNo={this.state.customerNo} changeCustomerMode={this.changeCustomerMode}/>;
                break;
            default:
                break;
        }
        return (

            <div className="container equal">


                    {
                        topBar !== null ?
                            topBar
                            : null
                    }
                    {modeComponent}

                {
                    this.state.currentMode == 'read' ?
                <div className="col-right bg-yellow c_layout">
                        <CreateCustomerComponent/>
                </div> :
                        null
                }
            </div>
        );
    }
}

export default ReadCustomersComponent;