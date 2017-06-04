import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

class ReadOneCustomerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            email: '',
            address: '',
            postcode: '',
            city: '',
            country: '',
            cvr: 0
        };
        this.fetchSingleCustomer = this.fetchSingleCustomer.bind(this);
    }

    fetchSingleCustomer(cusNo) {
        this.serverRequestProd = $.get("http://localhost/api/customer/read_one.php?number=" + cusNo,
            (customer) => {
                this.setState({number: customer.number});
                this.setState({name: customer.name});
                this.setState({email: customer.email});
                this.setState({address: customer.address});
                this.setState({postcode: customer.postcode});
                this.setState({city: customer.city});
                this.setState({country: customer.country});
                this.setState({cvr: customer.cvr});
            });
    }

    componentDidMount() {
        let cusNo = this.props.cusNo;
        this.fetchSingleCustomer(cusNo);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeCustomerMode('read')}>
                    <div className="back"/>
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table_list">
                        <caption><h4 className="table_title">DETAILS OF</h4>
                        <h4 className="table_title">THE CUSTOMER</h4></caption>
                        <tbody>
                        <tr>
                            <td>Number</td>
                            <td>{this.state.number}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.address}</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{this.state.postcode}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{this.state.city}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{this.state.country}</td>
                        </tr>
                        <tr>
                            <td>CVR</td>
                            <td>{this.state.cvr}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ReadOneCustomerComponent;