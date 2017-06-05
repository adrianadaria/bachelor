import React from 'react';
import $ from 'jquery';

import OrderTableComponent from './order_table.component.jsx';
import ReadOneOrderComponent from './read_one_order.component.jsx';
import DeleteOrderComponent from './delete_order.component.jsx';

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
        if(this.serverRequest) {
            this.serverRequest.abort();
        }
        this.serverRequest = $.get("http://localhost/api/order/read.php", (order) => {
            this.setState({
                orders: order.records
            });
        });
    }

    componentDidMount() {
        this.fetchOrders();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    changeOrderMode(newMode, orderId) {
        this.setState({currentMode: newMode});

        if(orderId !== undefined) {
            this.setState({orderId: orderId});
        }
    }

    render() {
        let filteredOrders = this.state.orders;
        let modeComponent = <OrderTableComponent orders={filteredOrders} changeOrderMode={this.changeOrderMode} />;
        let bar = null;

        switch(this.state.currentMode) {
            case 'read':
                bar = (
                    <a href='#' onClick={() => this.fetchOrders()}>
                        <div className="refresh"/>
                    </a>
                );
                break;
            case 'readOne':
                modeComponent =
                    <ReadOneOrderComponent orderId={this.state.orderId} changeOrderMode={this.changeOrderMode}/>;
                break;
            case 'delete':
                modeComponent =
                    <DeleteOrderComponent orderId={this.state.orderId} changeOrderMode={this.changeOrderMode}/>;
                break;
            default:
                break;
        }

        return (

            <div className="container equal">
                <div className="col-left bg-light-grey left-typo scroll col-fullwidth">
                 {
                    bar !== null ?
                        bar
                        : null
                }
                    {modeComponent}
                </div>
            </div>

        );
    }

}

export default ReadOrdersComponent;