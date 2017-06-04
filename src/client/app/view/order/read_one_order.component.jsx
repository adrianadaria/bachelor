import React from 'react';
import $ from 'jquery';

class ReadOneOrderComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            cusNo: 0,
            date: '',
            delAddress: '',
            delZip: '',
            delCity: '',
            delCountry: '',
            delTerms: '',
            delDate: '',
            total: 0.00,
            name: ''
        };
        this.fetchSingleOrder = this.fetchSingleOrder.bind(this);
    }

    fetchSingleOrder(orderId){
        this.serverRequestProd = $.get("http://localhost/api/order/read_one.php?id=" + orderId,
            (order) => {
                this.setState({id: order.id});
                this.setState({cusNo: order.cusNo});
                this.setState({date: order.date});
                this.setState({delAddress: order.delAddress});
                this.setState({delZip: order.delZip});
                this.setState({delCity: order.delCity});
                this.setState({delCountry: order.delCountry});
                this.setState({delTerms: order.delTerms});
                this.setState({delDate: order.delDate});
                this.setState({total: order.total});
                this.setState({name: order.name});
            });
    }

    componentDidMount() {
        let orderId = this.props.orderId;
        this.fetchSingleOrder(orderId);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeOrderMode('read')}>
                    <div className="back"/>
                </a>
                <form>
                    <table className="table_list">
                    <caption className="products_caption"><h4 className="table_title">DETAILS OF</h4>
                    <h4 className="table_title">THE ORDER</h4></caption>
                        <tbody>
                        <tr>
                            <td>Id</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>CusName</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{this.state.date}</td>
                        </tr>
                        <tr>
                            <td>DelAddress</td>
                            <td>{this.state.delAddress}</td>
                        </tr>
                        <tr>
                            <td>DelZip</td>
                            <td>{this.state.delZip}</td>
                        </tr>
                        <tr>
                            <td>DelCity</td>
                            <td>{this.state.delCity}</td>
                        </tr>
                        <tr>
                            <td>DelCountry</td>
                            <td>{this.state.delCountry}</td>
                        </tr>
                        <tr>
                            <td>DelTerms</td>
                            <td>{this.state.delTerms}</td>
                        </tr>
                        <tr>
                            <td>DelDate</td>
                            <td>{this.state.delDate}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{parseFloat(this.state.total).toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneOrderComponent;