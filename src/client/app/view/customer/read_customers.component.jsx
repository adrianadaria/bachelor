import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

import CustomerTableComponent from './customer_table.component.jsx';
import ReadOneCustomerComponent from './read_one_customer.component.jsx';
import CreateCustomerComponent from './create_customer.component.jsx';
import UpdateCustomerComponent from './update_customer.component.jsx';
import DeleteCustomerComponent from './delete_customer.component.jsx';

class ReadCustomersComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            customerNo: null,
            customers: []
        }

        this.changeCustomerMode = this.changeCustomerMode.bind(this);
        this.fetchCustomers = this.fetchCustomers.bind(this);
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchCustomers();
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    fetchCustomers() {
        this.serverRequest = $.get("http://localhost/api/customer/read.php", (customers) => {
            this.setState({
                customers: customers.records
            });
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
        let modeComponent = <CustomerTableComponent customers={filteredProducts} changeCustomerMode={this.changeCustomerMode} />;
        $('.page-header h1').text('Read Products');

        switch(this.state.currentMode) {
            case 'read':
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
                    <UpdateCustomerComponent productId={this.state.customerId} changeCustomerMode={this.changeCustomerMode}/>;
                break;
            case 'delete':
                modeComponent =
                    <DeleteCustomerComponent productId={this.state.customerId} changeCustomerMode={this.changeCustomerMode}/>;
                break;
            default:
                break;
        }
        //console.log(filteredProducts);
        return (
            //if current mode read render tobar

            <div className="container equal">
                <div className="col-left bg-grey left-typo scroll">
                {modeComponent}
                </div>
                 <div className="col-right bg-yellow">
                    <CreateCustomerComponent/>
                </div>
            </div>
        );
    }

}

export default ReadCustomersComponent;