import React from 'react';
import $ from 'jquery';

import OrderTableComponent from './order_table.component.jsx';

class ReadOrdersComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            orderId: null,
            orders: []
        };

        this.changeOrderMode = this.changeOrderMode.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
    }

    fetchOrders() {
        this.serverRequest = $.get("http://localhost/api/order/read.php", (order) => {
            this.setState({
                orders: order.records
            });
        });
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchOrders();
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeOrderMode(newMode, orderId) {
        this.setState({currentMode: newMode});

        if(orderId !== undefined) {
            this.setState({orderId: orderId});
        }
    }

    // render component on the page
    render() {
        let filteredOrders = this.state.orders;
        let modeComponent = <OrderTableComponent orders={filteredOrders} changeOrderMode={this.changeOrderMode} />;
        $('.page-header h1').text('Read Orders');
        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                //modeComponent =
                //    <ReadOneProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'create':
                //modeComponent = <CreateProductComponent changeProductMode={this.changeProductMode}/>;
                break;
            case 'update':
                //modeComponent =
                //   <UpdateProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'delete':
                //modeComponent =
                //    <DeleteProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            default:
                break;
        }

        return (
            //if current mode read render tobar
            <div className="container equal">
                <div className="col-left bg-grey left-typo scroll">
                    {modeComponent}
                </div>
                <div className="col-right bg-yellow">
                </div>
            </div>
        );
    }

}

export default ReadOrdersComponent;