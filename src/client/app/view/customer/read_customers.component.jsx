import React from 'react';
import $ from 'jquery';
import style from '../sass/home_page.scss';
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
            customerId: null,
            customers: []
        }

        this.changeCustomerMode = this.changeCustomerMode.bind(this);
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
    }

    changeCustomerMode(newMode, customerId) {
        this.setState({currentMode: newMode});

        if(customerId !== undefined) {
            this.setState({customerId: customerId});
        }
    }

    // render component on the page
    render() {
        let filteredProducts = this.state.customers;
        let modeComponent;// = <CustomerTableComponent customers={filteredProducts} changeCustomerMode={this.changeCustomerMode} />;
        $('.page-header h1').text('Read Products');

        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneCustomerComponent productId={this.state.customerId} changeCustomerMode={this.changeCustomerMode}/>;
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
            <div id='#body'>

                welcome customer section
            </div>
        );
    }

}

export default ReadCustomersComponent;